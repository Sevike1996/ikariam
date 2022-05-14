#include <cmath>
#include <algorithm>
#include <iostream>
#include <iterator>

#include "formation.hpp"

struct SlotInfo
{
    int amount;
    int size;
};

SlotInfo BATTLE_FIELD_SIZES[][Formation::Type::type_count] = {
    {{3, 30}, {3, 30}, {0, 0}, {1, 30}, {1, 10}, {1, 10}},
    {{5, 30}, {5, 30}, {2, 30}, {2, 30}, {1, 20}, {1, 20}},
    {{7, 30}, {7, 30}, {4, 30}, {3, 30}, {1, 30}, {1, 30}},
    {{7, 40}, {7, 40}, {6, 30}, {4, 30}, {2, 20}, {2, 20}},
    {{7, 50}, {7, 50}, {6, 40}, {5, 30}, {2, 30}, {2, 30}},
};

static const std::vector<Unit> acceptableUnits[] = {
    {Unit::gyrocopter},
    {Unit::bombardier},
    {Unit::mortar, Unit::ballista_ship, Unit::ram},
    {Unit::carbineer, Unit::archer, Unit::slinger},
    {Unit::hoplite, Unit::steam_giant, Unit::spearman, Unit::swordsman, Unit::slinger, Unit::carbineer, Unit::archer},
    {Unit::swordsman, Unit::spearman},
};

Formation::Formation(enum BattleFieldSize battleSize, Type formatinType) : _battleSize(battleSize), _type(formatinType)
{
}

const std::vector<Unit> Formation::getAcceptableUnits() const
{
    return acceptableUnits[_type];
}

const std::vector<Slot> Formation::getSlots() const {
    return _slots;
}

void Formation::fill_slot(const UnitMeta* meta, int count, int first_health, int& ammo_pool)
{
    _slots.push_back(Slot{meta, count, first_health, ammo_pool});
}

Formation Formation::copy() const
{
    Formation dup(_battleSize, _type);
    std::copy(_slots.begin(), _slots.end(), std::back_inserter(dup._slots));
    return dup;
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
    int offset = 0;

    for (int row = 0; row < row_count && !other._slots.empty(); row++) {
        int row_damage = 0;
        int hit_slot_index = (row - offset) % other._slots.size();
        Slot& defending = other._slots[hit_slot_index];
        // std::cout << row << " -> " << hit_slot_index << std::endl;

        for (std::size_t i = 0; i < _slots.size(); i++) {
            Slot& attacking = _slots[i];
            row_damage += std::max(attacking.meta->attack - defending.meta->armor, 0);
            attacking.count--; // mark when unit is hit, remove from attack formation.
        }

        int damage_left = row_damage - defending.first_health;
        defending.first_health -= row_damage;

        // Did not kill anyone
        if (damage_left < 0) {
            // std::cout << *this <<  " & " << other << std::endl;
            continue;
        }

        defending.count -= std::floor(damage_left / defending.meta->health) + 1;
        defending.first_health = defending.meta->health - (damage_left % defending.meta->health);
        // std::cout << *this <<  " & " << other << std::endl;
        if (defending.count < 1) {
            other._slots.erase(other._slots.begin() + hit_slot_index);
            offset = row - hit_slot_index - 1;
            // std::cout << hit_slot_index << " died" << std::endl;
        }
    }
}

std::ostream& operator<<(std::ostream& os, Slot const& slot) {
    const char* name = nullptr;
    for (auto& i : UNIT_NAMES) {
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
