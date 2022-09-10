#pragma once

#include "sql/connection.hpp"
#include "unit.hpp"

class StatLoader
{
public:
    virtual ~StatLoader() = default;

    virtual UnitMeta load_stats(Unit unit) const;
};

class DefensiveStatLoader : public StatLoader
{
public:
    virtual ~DefensiveStatLoader() = default;

    DefensiveStatLoader(sql::Connection& conn, int town_id);

    UnitMeta load_stats(Unit unit) const override;

    UnitMeta load_wall_stats() const;

private:
    sql::Connection& _conn;
    int _town_id;
};