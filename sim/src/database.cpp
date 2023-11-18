#include "blobfs/blobfs.hpp"
#include "database.hpp"

#include <ctime>
#include <sstream>

using namespace std::string_literals;

#ifdef RELEASE
Database::Database() : _blobs("/var/ikariam/rounds")
#else
Database::Database() : _blobs("/tmp/ikariam/rounds")
#endif
{
    _conn.connect("/tmp/mysqld/mysqld.sock", "ik_game");
}

std::list<std::tuple<Unit, int>> Database::load_defending_units(const Mission& mission)
{
    std::list<std::tuple<Unit, int>> units;
    std::stringstream query;
    query << "SELECT * FROM alpha_town_units where town_id = " << mission.to << ";";
    sql::Result result = _conn.query(query.str());

    auto count = result.row_count();
    for (int i = 0; i < count; i++) {
        auto row = result[i];
        auto unit = std::any_cast<int>(row["type"]);
        auto count = std::any_cast<int>(row["count"]);
        units.emplace_back(static_cast<Unit>(unit), count);
    }

    return units;
}

std::list<std::tuple<Unit, int>> Database::load_attacking_units(const Mission& mission)
{
    std::list<std::tuple<Unit, int>> units;
    std::stringstream query;
    query << "SELECT type,count FROM alpha_mission_units where mission_id = " << mission.id << ";";
    sql::Result result = _conn.query(query.str());

    auto count = result.row_count();
    for (int i = 0; i < count; i++) {
        auto row = result[i];
        auto unit = std::any_cast<int>(row["type"]);
        auto count = std::any_cast<int>(row["count"]);
        units.emplace_back(static_cast<Unit>(unit), count);
    }

    return units;
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
    mission.type = static_cast<Mission::Type>(std::any_cast<int>(row["type"]));
    mission.next_stage_time = std::any_cast<long long>(row["next_stage_time"]);

    return mission;
}
int Database::get_town_player_id(int town_id)
{
    std::stringstream query;
    query << "SELECT user_id FROM alpha_towns where id = " << town_id << +";";
    sql::Result res = _conn.query(query.str());
    auto row = res[0];
    return std::any_cast<int>(row["user_id"]);
}

BuildingLevels Database::get_buildings(int town_id)
{
    std::stringstream query;
    // TODO load pos1, pos2 (ports/shipyards)
    query << "SELECT pos0_level, pos14_level FROM alpha_towns where id = " << town_id << +";";
    sql::Result res = _conn.query(query.str());

    auto row = res[0];
    return BuildingLevels{
        std::any_cast<int>(row["pos0_level"]),
        std::any_cast<int>(row["pos14_level"]),
        0,
        0,
    };
}


std::unique_ptr<Army::Improvements> Database::get_army_improvements(int town_id)
{
    auto stats = std::make_unique<Army::Improvements>();
    return stats;
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
        Mission::Type::PLUNDER, Mission::Type::OCCUPY_PORT);
    auto result = statement.result();

    auto count = result.row_count();
    for (int i = 0; i < count; i++) {
        auto row = result[i];
        int id = std::any_cast<int>(row["id"]);
        missions.push_back(this->load_mission(id));
    }

    return missions;
}

void Database::update_arrived(const Mission& mission, int battlefield_size)
{
    auto statement = _conn.create_statement();
    statement.execute("update alpha_missions set state = ?, next_stage_time = ? where id = ?",
                      Mission::State::IN_BATTLE, mission.next_stage_time + Mission::STAGE_INTERVAL, mission.id);
    _create_battle(mission, battlefield_size);
}

void Database::_create_battle(const Mission& mission, int battlefield_size)
{
    auto statement = _conn.create_statement();
    statement.execute("INSERT INTO alpha_battles(mission_id, start_time, battlefield_size) VALUES(?, ?, ?)", mission.id,
                      mission.next_stage_time, battlefield_size);
}

void Database::store_round_ui(const Mission& mission, const std::string& round_data)
{
    store_round(mission, round_data, "alpha_rounds_ui");
}

void Database::store_round_data(const Mission& mission, const std::string& round_data)
{
    store_round(mission, round_data, "alpha_rounds_data");
}

#include <iostream>
void Database::store_round(const Mission& mission, const std::string& round_data, std::string round_table_name)
{
    int round_id;
    std::string blob_id = _blobs.put(round_data);

    auto statement = _conn.create_statement();
    statement.execute("select count(mission_id) as count from "s + round_table_name + " where mission_id = ?",
                      mission.id);
    auto result = statement.result();
    round_id = std::any_cast<long long>(result[0]["count"]) + 1;

    statement = _conn.create_statement();
    std::cout << mission.id << "," << round_id << "," << blob_id << std::endl;
    statement.execute("INSERT INTO "s + round_table_name + " values (?,?,?)", mission.id, round_id, blob_id);
}

std::optional<std::string> Database::get_last_round(const Mission& mission)
{
    auto statement = _conn.create_statement();
    statement.execute("select round_path from alpha_rounds_data where mission_id = ? order by round desc limit 1",
                      mission.id);
    auto result = statement.result();
    if (result.row_count() < 1) {
        return {};
    }

    auto round_path = std::any_cast<std::string>(result[0]["round_path"]);
    return _blobs.get(round_path);
}
