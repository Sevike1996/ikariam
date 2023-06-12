#pragma once

#include "database.hpp"
#include "unit.hpp"

class StatLoader
{
public:
    virtual ~StatLoader() = default;

    StatLoader(Database& db, int town_id);

    UnitMeta load_stats(Unit unit);

    UnitMeta load_wall_stats();

private:
    Database& _db;
    int _town_id;
};