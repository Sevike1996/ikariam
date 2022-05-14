#include "database.hpp"

#include <sstream>


Database::Database() : _conn("/tmp/mysqld/mysqld.sock", "ik_game")
{
}

Army Database::load_city_army(int city_id) 
{
    Army army;
    std::stringstream query;
    query << "SELECT * FROM alpha_army where city = " << city_id << ";";
    sql::Result result = _conn.query(query.str());

    auto row = result[0];
    for (const auto [unit_name, raw_count] : row) {
        auto it = UNIT_TYPES.find(unit_name);
        if (it == UNIT_TYPES.end()) {
            continue;
        }
        int count = std::any_cast<int>(raw_count);
        if (count == 0) {
            continue;
        }
        Unit unit_type = it->second;
        army.reinforce(unit_type, count);
    }

    return army;
}

Army Database::load_mission_army(int mission_id)
{
    Army army;
    std::stringstream query;
    query << "SELECT type,count FROM alpha_mission_units where mission_id = " << mission_id << ";";
    sql::Result result = _conn.query(query.str());
    
    for (auto row : result) {
        auto unit = std::any_cast<int>(row["type"]);
        auto count = std::any_cast<int>(row["count"]);
        army.reinforce(static_cast<Unit>(unit), count);
    }

    return army;
}