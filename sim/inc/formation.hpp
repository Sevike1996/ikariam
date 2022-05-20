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

    std::size_t get_biggest_slot_size() const;
    std::size_t size() const;
    int get_units_count() const;
    int get_losses_count() const;

    int get_next_occupied_index(int current);
    Slot& operator[](std::size_t index);

    bool is_empty() const;

    void fill_slot(const UnitMeta* meta, int count, int first_health, int& ammo_pool);

    json to_json() const;

private:
    std::vector<Slot> _slots;
    Type _type;
};

void to_json(nlohmann::json &serialized, const Slot &slot);