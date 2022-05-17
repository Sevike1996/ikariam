#include "army.hpp"

Army::Army() : _ammo_pools{0}
{
}

void Army::reinforce(Unit unit, int count)
{
    _units[unit] = count;
    if (is_ranged(unit)) {
        _ammo_pools[unit] = UNITS_META[unit].ammo * count;
    } else {
        _ammo_pools[unit] = 0;
    }
}

void Army::reinforce(Unit unit, int count, int ammo)
{
    _units[unit] = count;
    _ammo_pools[unit] = ammo;
}

int Army::get_units_count() const
{
    int count = 0;
    for (const auto& reserve : _units) {
        count += reserve.second;
    }
    return count;
}

int Army::get_squad(Unit unit, int slot_size)
{
    int size = UNITS_META[unit].size;
    int count = std::min(_units[unit], slot_size / size);
    if (is_ranged(unit)) {
        count = std::min(count, _ammo_pools[unit]);
    }

    _units[unit] -= count;
    return count;
}

int& Army::get_ammo_pool(Unit unit)
{
    return _ammo_pools[unit];
}

Army::json Army::get_units_json() const
{
    json serialized = json::array();
    for (const auto& unit : _units) {
        if (unit.second != 0) {
            serialized.push_back({unit.first, unit.second});
        }
    }
    return serialized;
}

Army::json Army::get_ammo_json() const
{
    json serialized;
    for (std::size_t i = 0; i < _ammo_pools.size(); i++) {
        if (_ammo_pools[i] != 0) {
            serialized[std::to_string(i)] = _ammo_pools[i];
        }
    }
    return serialized;
}