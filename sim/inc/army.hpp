#pragma once

#include <nlohmann/json.hpp>

#include "unit.hpp"

class Army
{
using json = nlohmann::json;
public:
    Army();

    void reinforce(Unit unit, int count);
    void reinforce(Unit unit, int count, int ammo);

    int get_squad(Unit unit, int slot_size);
    int& get_ammo_pool(Unit unit);

    json get_units_json();
    json get_ammo_json();

private:
    std::map<Unit, int> _units;
    std::array<int, Unit::type_count> _ammo_pools;
};