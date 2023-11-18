#pragma once

#include <memory>
#include <optional>
#include <array>
#include <list>

#include "unit.hpp"

class Army
{
public:
    struct UnitIprovments
    {
        int damage_bonus;
        int armor_bonus;
    };
    // Not yet supported in the server
    using Improvements = std::array<UnitIprovments, Unit::type_count>;

    typedef struct Squad
    {
        int count;
        int first_health;
        UnitMeta* stats;
    } Squad;

    Army(std::unique_ptr<Improvements> stat_loader, int wall_level = 0);

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

    std::map<Unit, int> get_reserves() const;
    std::map<Unit, int> get_ammo() const;
    std::map<Unit, float> get_ammo_percentage() const;

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
