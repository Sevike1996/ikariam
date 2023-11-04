#include "army.hpp"

Army::Army(std::unique_ptr<StatLoader> stat_loader) : _stat_loader(std::move(stat_loader)), _ammo_pools{0} {}

void Army::eliminate_dead(Unit unit, int died)
{
    _units[unit].count -= died;
}

void Army::set_first_health(Unit unit, std::list<int> first_healths)
{
    _first_healths[unit] = std::move(first_healths);
}

void Army::reinforce(Unit unit, int count)
{
    UnitMeta stats = _stat_loader->load_stats(unit);
    int ammo = 0;
    if (is_ranged(stats)) {
        _ammo_pools[unit] += UNITS_META[unit].ammo * count;
    }
    reinforce(unit, count, ammo);
}

void Army::reinforce_no_ammo(Unit unit, int count)
{
    reinforce(unit, count, {});
}

void Army::reinforce(Unit unit, int count, std::optional<int> ammo)
{
    UnitMeta stats = _stat_loader->load_stats(unit);
    auto key_value = _units.try_emplace(unit, UnitPool{0, 0, stats}).first;
    key_value->second.count += count;
    if (ammo) {
        _ammo_pools[unit] += ammo.value();
    }
}

int Army::get_units_count() const
{
    int count = 0;
    for (const auto& [unit, pool] : _units) {
        count += pool.count;
    }
    return count;
}

int Army::get_spare_count(Unit type) const
{
    auto found = _units.find(type);
    if (found == _units.end()) {
        return 0;
    }
    return found->second.count - found->second.used;
}

std::optional<Army::Squad> Army::borrow_squad(Unit unit, int slot_size)
{
    auto found = _units.find(unit);
    if (found == _units.end()) {
        return {};
    }

    UnitPool& pool = found->second;
    if (pool.count == pool.used) {
        return {};
    }

    int size = pool.stats.size;
    int count = std::min(pool.count - pool.used, slot_size / size);
    if (is_ranged(pool.stats)) {
        count = std::min(count, _ammo_pools[unit] - pool.used);
    }

    if (count == 0) {
        return {};
    }

    pool.used += count;
    int first_health = pop_first_health(unit).value_or(pool.stats.health);

    return Squad{count, first_health, &pool.stats};
}

std::optional<int> Army::pop_first_health(Unit unit)
{
    auto found = _first_healths.find(unit);
    if (found == _first_healths.end()) {
        return {};
    }
    auto& unit_first_healths = found->second;
    if (unit_first_healths.empty()) {
        return {};
    }
    int first_health = unit_first_healths.front();
    unit_first_healths.pop_front();
    return first_health;
}

void Army::return_squad(Unit unit, int count)
{
    auto found = _units.find(unit);
    if (found == _units.end()) {
        return;
    }

    UnitPool& pool = found->second;
    if (count > pool.used) {
        throw std::runtime_error("Sqaud returned is too large");
    }

    pool.used -= count;
}

int& Army::get_ammo_pool(Unit unit)
{
    return _ammo_pools[unit];
}

void Army::add_ammo(Unit unit, int ammo_count)
{
    _ammo_pools[unit] += ammo_count;
}

Army::json Army::get_reserves() const
{
    json serialized = json::array();
    for (const auto& [type, pool] : _units) {
        auto count = pool.count - pool.used;
        if (count != 0) {
            serialized.push_back({type, count});
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

Army::json Army::get_ammo_percentage() const
{
    json serialized = json::object();
    for (std::size_t i = 0; i < _ammo_pools.size(); i++) {
        if (_ammo_pools[i] == 0) {
            continue;
        }
        auto unit = static_cast<Unit>(i);
        auto found = _units.find(unit);
        if (found == _units.end()) {
            continue;
        }
        auto max_ammo = found->second.count * found->second.stats.ammo;
        auto percentage = static_cast<float>(_ammo_pools[i]) / max_ammo;
        serialized[std::to_string(i)] = percentage;
    }
    return serialized;
}

UnitMeta* Army::load_stats(Unit unit)
{
    reinforce(unit, 0);
    return &_units[unit].stats;
}
