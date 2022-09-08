#include "database.hpp"

#include <sstream>
#include <ctime>


Database::Database() : _conn("/tmp/mysqld/mysqld.sock", "ik_game")
{
}

Army Database::load_defensive_army(const Mission& mission) 
{
    Army army(std::make_unique<DefensiveStatLoader>(_conn, mission.to));
    std::stringstream query;
    query << "SELECT * FROM alpha_town_units where town_id = " << mission.to << ";";
    sql::Result result = _conn.query(query.str());

    for (auto row : result) {
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
    
    for (auto row : result) {
        auto unit = std::any_cast<int>(row["type"]);
        auto count = std::any_cast<int>(row["count"]);
        army.reinforce(static_cast<Unit>(unit), count);
    }

    return army;
}

Mission Database::load_mission(int mission_id)
{
    Mission mission;

    std::stringstream query;
    query << "SELECT * FROM alpha_missions where id = " << mission_id << ";";
    sql::Result result = _conn.query(query.str());

    auto row = result[0];
    
    mission.id = std::any_cast<int>(row["id"]);
    mission.from = std::any_cast<int>(row["from"]);
    mission.to = std::any_cast<int>(row["to"]);
    mission.state = static_cast<Mission::State>(std::any_cast<int>(row["state"]));
    mission.next_stage_time = std::any_cast<std::time_t>(row["next_stage_time"]);

    return mission;
}

BattleField::BattleFieldSize Database::getBattlefieldSize(const Mission& mission)
{
    std::stringstream query;
    query << "SELECT pos0_level FROM alpha_towns where id = " << mission.to << + ";";
    sql::Result res = _conn.query(query.str());
    
    auto row = res[0];
    int town_level = std::any_cast<int>(row["pos0_level"]);   
        
    if (town_level <= 4) {
        return BattleField::mini;
    } else if (town_level <= 9){
    return BattleField::small;
    } else if (town_level <= 16){
        return BattleField::medium;
    } else if (town_level <= 24){
        return BattleField::large;
    } else {
        return BattleField::big;
    }
}

std::string Database::getTownsUsername(int town_id)
{
    std::stringstream query;
    query << "select login from alpha_users where id = (select user_id from alpha_towns where id = " << town_id << ")";

    sql::Result res = _conn.query(query.str());

    auto row = res[0];
    return std::any_cast<std::string>(row["login"]);
}

std::list<int> Database::getMissionsNeedingUpdate()
{
    std::time_t now = time(nullptr);
    std::list<int> missions;
    std::stringstream query;
    query << "select id from alpha_missions where next_stage_time < " << now;

    sql::Result result = _conn.query(query.str());
    for (auto row : result) {
        int id = std::any_cast<int>(row["id"]);
        missions.push_back(id);
    }

    return missions;
}
