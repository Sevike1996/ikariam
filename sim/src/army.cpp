#include "army.hpp"

Army::Army(std::unique_ptr<StatLoader> stat_loader) : _stat_loader(std::move(stat_loader)), _ammo_pools{0}
{
}

void Army::reinforce(Unit unit, int count)
{
    UnitMeta stats = _stat_loader->load_stats(unit);
    _units.emplace(unit, UnitPool{count, stats});
    if (is_ranged(stats)) {
        _ammo_pools[unit] = UNITS_META[unit].ammo * count;
    } else {
        _ammo_pools[unit] = 0;
    }
}

void Army::reinforce(Unit unit, int count, int ammo)
{
    UnitMeta stats = _stat_loader->load_stats(unit);
    _units[unit] = {count, stats};
    _ammo_pools[unit] = ammo;
}

int Army::get_units_count() const
{
    int count = 0;
    for (const auto& [unit, pool] : _units) {
        count += pool.count;
    }
    return count;
}

int Army::get_unit_count(Unit type) const
{
    auto found = _units.find(type);
    if (found == _units.end()) {
        return 0;
    }
    return found->second.count;
}

std::optional<Army::Squad> Army::get_squad(Unit unit, int slot_size)
{
    auto found = _units.find(unit);
    if (found == _units.end()) {
        return {};
    }

    UnitPool& pool = found->second;
    if (pool.count == 0) {
        return {};
    }

    int size = pool.stats.size;
    int count = std::min(pool.count, slot_size / size);
    if (is_ranged(pool.stats)) {
        count = std::min(count, _ammo_pools[unit]);
    }

    pool.count -= count;

    return Squad{count, &pool.stats};
}

int& Army::get_ammo_pool(Unit unit)
{
    return _ammo_pools[unit];
}

Army::json Army::get_units_json() const
{
    json serialized = json::array();
    for (const auto& [type, pool] : _units) {
        if (pool.count != 0 && can_reserve(type)) {
            serialized.push_back({type, pool.count});
        }
    }
    return serialized;
}

Army::json Army::get_ammo_json() const
{
    json serialized = json::object();
    for (std::size_t i = 0; i < _ammo_pools.size(); i++) {
        if (_ammo_pools[i] != 0) {
            serialized[std::to_string(i)] = _ammo_pools[i];
        }
    }
    return serialized;
}