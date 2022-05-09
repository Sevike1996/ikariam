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
    const UnitMeta& meta;
    int count;
    int first_health;
    int& ammo_pool;

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

    void fill_slot(const UnitMeta& meta, int count, int first_health, int& ammo_pool);
    
    Formation copy() const;

    void hit(Formation& other);
    void shoot(Formation& other);

private:
    std::vector<Slot> _slots;
    enum BattleFieldSize _battleSize;
    Type _type;

    friend std::ostream &operator<<(std::ostream &os, Formation const &m);
};

std::ostream &operator<<(std::ostream &os, Formation const &m);