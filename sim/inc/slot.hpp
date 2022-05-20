#pragma once

#include "unit.hpp"

struct AttackInfo {
    int damage;
    int unit_count;
};

struct Slot {
    const UnitMeta* meta;
    int orig_count;
    int count;
    int first_health;
    int& ammo_pool;

    Slot& operator=(const Slot& other);
    bool operator==(const Slot& other) const;

    void apply_damage(AttackInfo& info);
};