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
    {Unit::hoplite, Unit::steam_giant, Unit::spearmen, Unit::swordsman, Unit::slinger, Unit::carbineer, Unit::archer},
    {Unit::swordsman, Unit::spearmen},
};

Formation::Formation(enum BattleFieldSize battleSize, Type formatinType) : _battleSize(battleSize), _type(formatinType)
{
}

const std::vector<Unit> Formation::getAcceptableUnits() const
{
    return acceptableUnits[_type];
}

void Formation::fill_slot(const UnitMeta& meta, int count, int first_health, int& ammo_pool)
{
    _slots.push_back(Slot{meta, count, first_health, ammo_pool});
}

Formation Formation::copy() const
{
    Formation dup(_battleSize, _type);
    std::copy(_slots.begin(), _slots.end(), std::back_inserter(dup._slots));
    return dup;
}

/*
 8 hop  |   8 sword    |     8 steam
 steam steam
 sword sword
 hop   hop
 steam steam steam
 sword sword sword
 hop   hop   hop
 steam steam steam
 sword sword sword
 hop   hop   hop



 h w s 
 h w s 
 h w s 
 h w s 
 h w s 
 h w s 
 h w s 
 h w s


 s
 w
 h
 s s s s s s s
 w w w w w w w 
 h h h h h h h
*/

/*
 8 hop  |   1 sword    |     2 steam
 steam steam
 sword sword
 hop   hop
 steam steam steam
 sword sword sword
 hop   hop   hop
 steam steam steam
 sword sword sword
 hop   hop   hop
*/

#include <cmath>
#include <algorithm>

static bool compare_slot_count(const Slot& a, const Slot& b)
{
    return a.count < b.count;
}

// TODO Flip other and this. This is current hit by other :(
void Formation::hit(Formation &other)
{
    if (other._slots.size() == 0) {
        return;
    }
    int row_count = std::max_element(other._slots.begin(), other._slots.end(), compare_slot_count)->count;
    for (int row = 0; row < row_count; row++) {
        int row_damage = 0;
        Slot& defending = _slots[row % _slots.size()];

        for (std::size_t i = 0; i < other._slots.size(); i++) {
            Slot& attacking = other._slots[i];
            row_damage += std::max(attacking.meta.attack - attacking.meta.armor, 0);
            attacking.count--; // mark when unit is hit, remove from attack formation.
        }

        int damage_left = row_damage - defending.first_health;
        defending.first_health -= row_damage;

        // Did not kill anyone
        if (damage_left < 0) {
            continue;
        }

        defending.count -= std::floor(row_damage / defending.meta.health);
        defending.first_health = defending.meta.health - (row_damage % defending.meta.health);
    }

    // {
    //     Slot& attacking = other._slots[0];
    // Slot& defending = _slots[0];

    // int damage = UNITS_DATA[attacking.type].attack - UNITS_DATA[defending.type].armor;
    // int damage_left = damage - defending.first_health;
    // defending.first_health -= damage;
    
    // // Did not kill anyone
    // if (damage_left < 0) {
    //     continue;
    // }
    
    // defending.count -= std::floor(damage / UNITS_DATA[defending.type].health);
    // defending.first_health = UNITS_DATA[defending.type].health - (damage % UNITS_DATA[defending.type].health);
    // }
}

std::ostream &operator<<(std::ostream &os, Formation const &m) { 
    os << "{";
    for (const auto& slot : m._slots) {
        const char* name = nullptr;
        for (auto& i : UNIT_NAMES) {
            if (i.second == slot.meta.type) {
                name = i.first.c_str();
            }
        }
        os << "(" << name << ", " << slot.count << ", " << slot.first_health << "/" << slot.meta.health << "), ";
    }
    os << "}" << std::endl;

    return os;
}
