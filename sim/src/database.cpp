#include "database.hpp"
#include "blobfs/blobfs.hpp"

#include <ctime>
#include <sstream>

#ifdef RELEASE
Database::Database() : _blobs("/var/ikariam/rounds")
#else
Database::Database() : _blobs("/tmp/ikariam/rounds")
#endif
{
    _conn.connect("/tmp/mysqld/mysqld.sock", "ik_game");
}

Army Database::load_defensive_army(const Mission& mission)
{
    Army army(std::make_unique<DefensiveStatLoader>(_conn, mission.to));
    std::stringstream query;
    query << "SELECT * FROM alpha_town_units where town_id = " << mission.to << ";";
    sql::Result result = _conn.query(query.str());

    auto count = result.row_count();
    for (int i = 0; i < count; i++) {
        auto row = result[i];
        auto unit = std::any_cast<int>(row["type"]);
        auto count = std::any_cast<int>(row["count"]);
        army.reinforce(static_cast<Unit>(unit), count);
    }

    auto size = getBattlefieldSize(mission);
    int wall_count = BattleField::BATTLE_FIELD_SIZES[size][Formation::Type::front].amount;
    army.reinforce(Unit::wall, wall_count);

    return army;
}

Army Database::load_attacking_army(const Mission& mission)
{
    Army army(std::make_unique<StatLoader>());
    std::stringstream query;
    query << "SELECT type,count FROM alpha_mission_units where mission_id = " << mission.id << ";";
    sql::Result result = _conn.query(query.str());

    auto count = result.row_count();
    for (int i = 0; i < count; i++) {
        auto row = result[i];
        auto unit = std::any_cast<int>(row["type"]);
        auto count = std::any_cast<int>(row["count"]);
        army.reinforce(static_cast<Unit>(unit), count);
    }

    return army;
}

Mission Database::load_mission(int mission_id)
{
    Mission mission;

    auto statement = _conn.create_statement();
    statement.execute("SELECT * FROM alpha_missions where id = ?", mission_id);
    auto result = statement.result();

    auto row = result[0];
    mission.id = std::any_cast<int>(row["id"]);
    mission.from = std::any_cast<int>(row["from"]);
    mission.to = std::any_cast<int>(row["to"]);
    mission.state = static_cast<Mission::State>(std::any_cast<int>(row["state"]));
    mission.next_stage_time = std::any_cast<long long>(row["next_stage_time"]);

    return mission;
}

int Database::get_mission_battle(const Mission& mission)
{
    auto statement = _conn.create_statement();
    statement.execute("SELECT id FROM alpha_battles where mission_id = ?", mission.id);
    auto result = statement.result();
    return std::any_cast<int>(result[0]["id"]);
}

BattleField::BattleFieldSize Database::getBattlefieldSize(const Mission& mission)
{
    std::stringstream query;
    query << "SELECT pos0_level FROM alpha_towns where id = " << mission.to << +";";
    sql::Result res = _conn.query(query.str());

    auto row = res[0];
    int town_level = std::any_cast<int>(row["pos0_level"]);

    if (town_level <= 4) {
        return BattleField::mini;
    } else if (town_level <= 9) {
        return BattleField::small;
    } else if (town_level <= 16) {
        return BattleField::medium;
    } else if (town_level <= 24) {
        return BattleField::large;
    } else {
        return BattleField::big;
    }
}

std::string Database::getTownsUsername(int town_id)
{
    std::stringstream query;
    query << "select login from alpha_users where id = (select user_id from "
             "alpha_towns where id = "
          << town_id << ")";

    sql::Result res = _conn.query(query.str());

    auto row = res[0];
    return std::any_cast<std::string>(row["login"]);
}

std::list<Mission> Database::get_missions_needing_update(Mission::State state)
{
    std::list<Mission> missions;
    auto statement = _conn.create_statement();
    statement.execute(
        "select id from alpha_missions where next_stage_time < now() and state = ? and type between ? and ?", state,
        Mission::Type::PLUNDER, Mission::Type::CAPTURING_PORT);
    auto result = statement.result();

    auto count = result.row_count();
    for (int i = 0; i < count; i++) {
        auto row = result[i];
        int id = std::any_cast<int>(row["id"]);
        missions.push_back(this->load_mission(id));
    }

    return missions;
}

void Database::update_arrived(const Mission& mission)
{
    auto statement = _conn.create_statement();
    statement.execute("update alpha_missions set state = ?, next_stage_time = ? where id = ?",
                      Mission::State::IN_BATTLE, mission.next_stage_time + Mission::STAGE_INTERVAL, mission.id);
    _create_battle(mission);
}

void Database::_create_battle(const Mission& mission)
{
    auto statement = _conn.create_statement();
    statement.execute("INSERT INTO alpha_battles(mission_id, start_time) VALUES(?, ?)", mission.id,
                      mission.next_stage_time);
}

void Database::store_round(int battle_id, const std::string& round_data)
{
    int round_id;
    std::string blob_id = _blobs.put(round_data);

    auto statement = _conn.create_statement();
    statement.execute(
        "select count(battle_id) as count from alpha_battle_rounds where "
        "battle_id = ?",
        battle_id);
    auto result = statement.result();
    round_id = std::any_cast<long long>(result[0]["count"]) + 1;

    statement = _conn.create_statement();
    statement.execute("INSERT INTO alpha_battle_rounds values (?,?,?)", battle_id, round_id, blob_id);
}
