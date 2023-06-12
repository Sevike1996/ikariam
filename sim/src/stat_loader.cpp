#include "stat_loader.hpp"

#include <any>

StatLoader::StatLoader(Database& db, int town_id) : _db(db), _town_id(town_id)
{
}

UnitMeta StatLoader::load_stats(Unit unit)
{
    switch (unit)
    {
    case Unit::wall:
        return load_wall_stats();
    default:
        return UNITS_META[unit];
    }
}

UnitMeta StatLoader::load_wall_stats()
{
    return get_wall_meta(_db.get_wall_level(_town_id));
}