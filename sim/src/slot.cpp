#include <cmath>

#include "slot.hpp"

Slot& Slot::operator=(const Slot& other)
{
    this->meta = other.meta;
    this->orig_count = other.orig_count;
    this->count = other.count;
    this->first_health = other.first_health;
    this->ammo_pool = other.ammo_pool;
    return *this;
}

bool Slot::operator==(const Slot& other) const
{
    return meta->type == other.meta->type && orig_count == other.orig_count && count == other.count &&
           first_health == other.first_health;
}

void Slot::apply_damage(AttackInfo& info)
{
    int damage = info.damage - (info.unit_count * meta->armor);
    if (damage <= 0) {
        return;
    }

    int damage_left = damage - first_health;
    first_health -= damage;

    // Did not kill anyone
    if (damage_left < 0) {
        return;
    }

    count -= std::floor((float)damage_left / meta->health) + 1;
    first_health = meta->health - (damage_left % meta->health);
    if (count < 1) {
        count = 0;
        first_health = 0;
    }
}
