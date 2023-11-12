#pragma once

#include <memory>
#include <nlohmann/json.hpp>
#include <optional>

#include "stat_loader.hpp"
#include "unit.hpp"

class Army
{
    using json = nlohmann::json;

public:
    typedef struct Squad
    {
        int count;
        int first_health;
        UnitMeta* stats;
    } Squad;

    Army(std::unique_ptr<ArmyImprovements> stat_loader);

    void eliminate_dead(Unit unit, int died);

    void set_first_health(Unit unit, std::list<int> first_healths);

    /**
     * @breif Add `count` units to reserves. If unit requires ammo, it is
     * initialized to full.
     */
    void reinforce(Unit unit, int count);

    /**
     * @breif Same as reinforce, but does not change the ammo pool of the unit.
     */
    void reinforce_no_ammo(Unit unit, int count);

    std::optional<Squad> borrow_squad(Unit unit, int slot_size);
    void return_squad(Unit unit, int count, int first_health);

    int& get_ammo_pool(Unit unit);
    void add_ammo(Unit unit, int ammo_count);

    int get_units_count() const;
    int get_spare_count(Unit type) const;

    std::map<Unit, std::list<int>> get_first_healths() const;

    json get_reserves() const;
    json get_ammo_json() const;
    json get_ammo_percentage() const;

private:
    std::optional<int> pop_first_health(Unit unit);
    void reinforce(Unit unit, int count, std::optional<int> ammo);

    typedef struct UnitPool
    {
        int count;
        int used;
        UnitMeta stats;
    } UnitPool;

    std::map<Unit, UnitPool> _units;
    std::array<int, Unit::type_count> _ammo_pools;
    std::array<UnitMeta, Unit::type_count> _stats;
    std::map<Unit, std::list<int>> _first_healths;
};
