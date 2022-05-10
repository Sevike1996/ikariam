#pragma once

#include <vector>
#include <ostream>

#include "unit.hpp"

enum BattleFieldSize {
    mini,
    small,
    medium,
    large,
    big,
};

struct Slot {
    const UnitMeta* meta;
    int count;
    int first_health;
    int& ammo_pool;

    Slot& operator=(const Slot& other) {
        this->meta = other.meta;
        this->count = other.count;
        this->first_health = other.first_health;
        this->ammo_pool = other.ammo_pool;
        return *this;
    }
};

class Formation
{
public:
    enum Type {
        air_defense,
        bomber,
        artillery,
        long_range,
        front,
        flank,
        type_count,
    };

    Formation(enum BattleFieldSize battleSize, Type formatinType);

    const std::vector<Unit> getAcceptableUnits() const;
    const std::vector<Slot> getSlots() const;

    void fill_slot(const UnitMeta* meta, int count, int first_health, int& ammo_pool);
    
    Formation copy() const;

    void hit(Formation& other);
    void shoot(Formation& other);

private:
    std::vector<Slot> _slots;
    enum BattleFieldSize _battleSize;
    Type _type;
};

std::ostream& operator<<(std::ostream& os, Slot const& slot);

std::ostream &operator<<(std::ostream &os, Formation const &m);