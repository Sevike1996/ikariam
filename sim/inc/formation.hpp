#pragma once

#include <vector>
#include <ostream>
#include <nlohmann/json.hpp>

#include "unit.hpp"
#include "slot.hpp"

class Formation
{
using json = nlohmann::json;
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

    static const std::string FORMATION_NAMES[];

    Formation(Type formatinType);
    Formation(const Formation& other);

    const std::vector<Unit>& getAcceptableUnits() const;
    const std::vector<Formation::Type>& get_attack_order() const;
    const std::vector<Slot> getSlots() const;
    int get_units_count() const;
    int get_losses_count() const;

    bool is_empty() const;

    void fill_slot(const UnitMeta* meta, int count, int first_health, int& ammo_pool);

    void hit(Formation& other);
    void shoot(Formation& other);

    json to_json() const;

private:
    std::vector<Slot> _slots;
    Type _type;
};

void to_json(nlohmann::json &serialized, const Slot &slot);