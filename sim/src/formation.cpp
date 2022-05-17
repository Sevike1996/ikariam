#include <cmath>
#include <algorithm>
#include <iostream>
#include <iterator>

#include "formation.hpp"

const std::string Formation::FORMATION_NAMES[] = {
    "air",
    "bomber",
    "artillery",
    "range",
    "front",
    "flank",
};

static const std::vector<Unit> acceptableUnits[] = {
    {Unit::gyrocopter},
    {Unit::bombardier},
    {Unit::mortar, Unit::ballista_ship, Unit::ram},
    {Unit::carbineer, Unit::archer, Unit::slinger},
    {Unit::hoplite, Unit::steam_giant, Unit::spearman, Unit::swordsman, Unit::slinger, Unit::carbineer, Unit::archer},
    {Unit::swordsman, Unit::spearman},
};

Formation::Formation(Type formatinType) : _type(formatinType)
{
}

Formation::Formation(const Formation& other) : _slots(other._slots), _type(other._type)
{
}

const std::vector<Unit> Formation::getAcceptableUnits() const
{
    return acceptableUnits[_type];
}

const std::vector<Slot> Formation::getSlots() const {
    return _slots;
}

int Formation::get_units_count() const
{
    int count = 0;
    for (const auto& slot : _slots) {
        count += slot.count;
    }
    return count;
}

int Formation::get_losses_count() const
{
    int count = 0;
    for (const auto& slot : _slots) {
        count += slot.orig_count - slot.count;
    }
    return count;
}

bool Formation::is_empty() const
{
    bool is_empty = true;
    for (const auto& slot : _slots) {
        is_empty &= slot.count < 1;
    }
    return is_empty;
}

void Formation::fill_slot(const UnitMeta* meta, int count, int first_health, int& ammo_pool)
{
    _slots.push_back(Slot{meta, count, count, first_health, ammo_pool});
}

static bool compare_slot_count(const Slot& a, const Slot& b)
{
    return a.count < b.count;
}

void Formation::hit(Formation &other)
{
    if (_slots.size() == 0) {
        return;
    }
    int row_count = std::max_element(_slots.begin(), _slots.end(), compare_slot_count)->count;
    int hit_slot_index = 0;

    for (int row = 0; row < row_count && !is_empty(); row++) {
        int row_damage = 0;
        do {
            hit_slot_index = (hit_slot_index + 1) % other._slots.size();
        }
        while (other._slots[hit_slot_index].count == 0);
        Slot& defending = other._slots[hit_slot_index];

        for (std::size_t i = 0; i < _slots.size(); i++) {
            Slot& attacking = _slots[i];
            row_damage += std::max(attacking.meta->attack - defending.meta->armor, 0);
            attacking.count--; // mark when unit is hit, remove from attack formation.
        }

        int damage_left = row_damage - defending.first_health;
        defending.first_health -= row_damage;

        // Did not kill anyone
        if (damage_left < 0) {
            continue;
        }

        defending.count -= std::floor(damage_left / defending.meta->health) + 1;
        defending.first_health = defending.meta->health - (damage_left % defending.meta->health);
        if (defending.count < 1) {
            defending.count = 0;
            defending.first_health = 0;
        }
    }
}

Formation::json Formation::to_json() const 
{
    json serialized = json::array();
    for (const auto& slot : _slots) {
        serialized.push_back(json(slot));
    }

    return serialized;
}

void to_json(nlohmann::json &serialized, const Slot &slot)
{
    int health_percentage = (static_cast<float>(slot.first_health) / slot.meta->health) * 100;

    serialized = nlohmann::json({
        static_cast<int>(slot.meta->type),
        slot.count,
        slot.orig_count - slot.count,
        health_percentage / 100.0,
    });
}

std::ostream& operator<<(std::ostream& os, Slot const& slot) {
    const char* name = nullptr;
    for (auto& i : UNIT_TYPES) {
        if (i.second == slot.meta->type) {
            name = i.first.c_str();
        }
    }
    os << "(" << name << ", " << slot.count << ", " << slot.first_health << "/" << slot.meta->health << ")";

    return os;
}

std::ostream& operator<<(std::ostream &os, Formation const &formation) { 
    os << "{ ";
    const auto& slots = formation.getSlots();
    std::copy(slots.begin(), slots.end(), std::ostream_iterator<Slot>(std::cout, ", "));
    os << " }";

    return os;
}
