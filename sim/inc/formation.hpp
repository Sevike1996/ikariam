#pragma once

#include <vector>
#include <ostream>
#include <nlohmann/json.hpp>

#include "unit.hpp"
#include "slot.hpp"
#include "army.hpp"

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

    static const std::vector<std::string> FORMATION_NAMES;
    static const std::vector<Unit> ACCEPTABLE_UNITS[];

    Formation(Type formationType, std::size_t max_slot_count, int slot_size);
    Formation(const Formation& other);

    const std::vector<Unit>& getAcceptableUnits() const;
    const std::vector<Formation::Type>& get_attack_order() const;

    std::size_t get_biggest_slot_size() const;
    std::size_t size() const;
    Type get_type() const;
    int get_units_count() const;
    int get_losses_count() const;
    std::list<std::tuple<Unit, int>> get_first_healths() const;

    int get_next_occupied_index(int current);
    Slot& operator[](std::size_t index);
    const Slot& operator[](std::size_t index) const;
    bool operator==(const Formation& other) const;

    bool is_empty() const;
    bool is_full() const;

    void fill_slot(const UnitMeta* meta, int count, int first_health, int& ammo_pool);
    void fill(std::shared_ptr<Army> army);
    void fill(std::shared_ptr<Army> army, Unit unit_type);
    void drain_into(std::shared_ptr<Army> army);

    json to_json() const;

private:
    std::vector<Slot> _slots;
    std::size_t _max_slot_count;
    int _slot_size;
    Type _type;
};

void to_json(nlohmann::json &serialized, const Slot &slot);
