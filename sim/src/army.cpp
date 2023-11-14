#include "army.hpp"

Army::Army(std::unique_ptr<ArmyImprovements> army_improvements) : _ammo_pools{0}
{
    for (size_t i = 0; i < static_cast<size_t>(Unit::type_count); i++) {
        if (i == Unit::wall) {
            _stats[i] = get_wall_meta(army_improvements->wall_level);
        } else {
            _stats[i] = UNITS_META[i];
        }
    }
}

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
    int ammo = 0;
    if (_stats[unit].is_ranged()) {
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
    auto key_value =
        _units.try_emplace(unit, UnitPool{0, 0, _stats[unit]}).first;
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
    if (pool.stats.is_ranged()) {
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

void Army::return_squad(Unit unit, int count, int first_health)
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

    if (count != 0) {
        _first_healths[unit].push_back(first_health);
    }
}

int& Army::get_ammo_pool(Unit unit)
{
    return _ammo_pools[unit];
}

void Army::add_ammo(Unit unit, int ammo_count)
{
    _ammo_pools[unit] += ammo_count;
}

std::map<Unit, std::list<int>> Army::get_first_healths() const
{
    return _first_healths;
}

std::map<Unit, int> Army::get_reserves() const
{
    std::map<Unit, int> reserves;
    for (const auto& [type, pool] : _units) {
        auto count = pool.count - pool.used;
        if (count != 0) {
            reserves[type] = count;
        }
    }
    return reserves;
}

std::map<Unit, int> Army::get_ammo() const
{
    std::map<Unit, int> ammo;
    for (std::size_t i = 0; i < _ammo_pools.size(); i++) {
        auto found = _units.find(static_cast<Unit>(i));
        if (found == _units.end()) {
            continue;
        }
        const auto& unit_pool = found->second;

        if (!unit_pool.stats.is_ranged() ||
            (_ammo_pools[i] == 0 && unit_pool.count == 0)) {
            continue;
        }

        ammo[static_cast<Unit>(i)] = _ammo_pools[i];
    }
    return ammo;
}

std::map<Unit, float> Army::get_ammo_percentage() const
{
    std::map<Unit, float> ammo;
    for (std::size_t i = 0; i < _ammo_pools.size(); i++) {
        auto found = _units.find(static_cast<Unit>(i));
        if (found == _units.end()) {
            continue;
        }
        const auto& unit_pool = found->second;
        if (!unit_pool.stats.is_ranged() ||
            (_ammo_pools[i] == 0 && unit_pool.count == 0)) {
            continue;
        }

        auto max_ammo = found->second.count * found->second.stats.ammo;
        auto percentage = static_cast<float>(_ammo_pools[i]) / max_ammo;
        ammo[static_cast<Unit>(i)] = percentage;
    }
    return ammo;
}
