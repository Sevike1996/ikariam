#pragma once

#include <memory>
#include <optional>
#include <nlohmann/json.hpp>

#include "stat_loader.hpp"
#include "unit.hpp"

class Army
{
using json = nlohmann::json;
public:
    typedef struct Squad {
        int count;
        UnitMeta* stats;
    } Squad;

    Army(std::unique_ptr<StatLoader> stat_loader);

    void reinforce(Unit unit, int count);
    void reinforce(Unit unit, int count, int ammo);

    std::optional<Squad> get_squad(Unit unit, int slot_size);
    int& get_ammo_pool(Unit unit);

    int get_units_count() const;
    int get_unit_count(Unit type) const;

    json get_units_json() const;
    json get_ammo_json() const;

    UnitMeta* load_stats(Unit unit);

private:
    typedef struct UnitPool {
        int count;
        UnitMeta stats;
    } UnitPool;

    std::unique_ptr<StatLoader> _stat_loader;
    std::map<Unit, UnitPool> _units;
    std::array<int, Unit::type_count> _ammo_pools;
};