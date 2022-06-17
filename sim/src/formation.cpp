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

const std::vector<Unit> Formation::ACCEPTABLE_UNITS[] = {
    {Unit::gyrocopter},
    {Unit::bombardier},
    {Unit::mortar, Unit::ballista_ship, Unit::ram},
    {Unit::carbineer, Unit::archer, Unit::slinger},
    {Unit::hoplite, Unit::steam_giant, Unit::spearman, Unit::swordsman, Unit::slinger, Unit::carbineer, Unit::archer},
    {Unit::swordsman, Unit::spearman},
};

static const std::vector<Formation::Type> ATTACK_ORDER[] = {
    {Formation::bomber, Formation::air_defense},
    {Formation::artillery, Formation::long_range, Formation::front, Formation::flank},
    {Formation::front, Formation::flank},
    {Formation::front, Formation::flank, Formation::long_range},
    {Formation::front, Formation::long_range, Formation::artillery, Formation::flank},
    {Formation::flank, Formation::long_range, Formation::artillery, Formation::front},
};

static bool compare_slot_count(const Slot& a, const Slot& b);

Formation::Formation(Type formatinType) : _type(formatinType)
{
}

Formation::Formation(const Formation& other) : _slots(other._slots), _type(other._type)
{
}

const std::vector<Unit>& Formation::getAcceptableUnits() const
{
    return ACCEPTABLE_UNITS[_type];
}

const std::vector<Formation::Type>& Formation::get_attack_order() const
{
    return ATTACK_ORDER[_type];
}

std::size_t Formation::get_biggest_slot_size() const
{
    auto found = std::max_element(_slots.begin(), _slots.end(), compare_slot_count);
    if (found == _slots.end()) {
        return 0;
    }
    return found->count;
}

static bool compare_slot_count(const Slot& a, const Slot& b)
{
    return a.count < b.count;
}

std::size_t Formation::size() const {
    return _slots.size();
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

int Formation::get_next_occupied_index(int current)
{
    if (is_empty()) {
        throw std::runtime_error("empty formation");
    }

    int hit_slot_index = current;
    int size = _slots.size();
    do
    {
        hit_slot_index = (hit_slot_index + 1) % size;
    }
    while (_slots[hit_slot_index].count == 0);
    return hit_slot_index;
}

Slot& Formation::operator[](std::size_t index)
{
    return _slots[index];
}

const Slot& Formation::operator[](std::size_t index) const
{
    return _slots[index];
}

bool Formation::operator==(const Formation& other) const
{
    return _slots == other._slots;
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
