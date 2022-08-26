#include "stat_loader.hpp"

#include <any>


UnitMeta StatLoader::load_stats(Unit unit) const
{
    return UNITS_META[unit];
}

DefensiveStatLoader::DefensiveStatLoader(sql::Connection& conn, int town_id) : _conn(conn), _town_id(town_id)
{
}

UnitMeta DefensiveStatLoader::load_stats(Unit unit) const
{
    switch (unit)
    {
    case Unit::wall:
        return load_wall_stats();
    default:
        return StatLoader::load_stats(unit);
    }
}

UnitMeta DefensiveStatLoader::load_wall_stats() const
{
    std::string s = "SELECT pos14_level FROM alpha_towns where id = " + std::to_string(_town_id) + ";";
    
    sql::Result res = _conn.query(s);
    auto row = res[0];
    int wall_level = std::any_cast<int>(row["pos14_level"]);
    
    return get_wall_meta(wall_level);
}