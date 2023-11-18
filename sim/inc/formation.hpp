#pragma once

#include <ostream>
#include <span>
#include <vector>

#include "army.hpp"
#include "slot.hpp"
#include "unit.hpp"

class Formation
{
public:
    enum Type
    {
        air_defense,
        bomber,
        artillery,
        long_range,
        front,
        flank,
        type_count,
    };

    static const std::vector<std::string> FORMATION_NAMES;
    using AcceptableUnits = std::vector<Unit>;

    Formation(Type formationType, std::size_t max_slot_count, int slot_size, const AcceptableUnits& acceptable_units);
    Formation(const Formation& other);

    const AcceptableUnits& getAcceptableUnits() const;
    const std::vector<Formation::Type>& get_attack_order() const;

    std::size_t get_biggest_slot_size() const;
    std::size_t size() const;
    int get_units_count() const;
    int get_losses_count() const;

    std::span<const Slot> get_slots() const;
    std::list<std::tuple<Unit, int>> get_first_healths() const;

    int get_next_occupied_index(int current);
    Slot& operator[](std::size_t index);
    const Slot& operator[](std::size_t index) const;
    bool operator==(const Formation& other) const;

    bool is_empty() const;
    bool is_full() const;

    void fill_slot(const UnitMeta* meta, int count, int first_health, int& ammo_pool);
    void fill(Army& army);
    void fill(Army& army, Unit unit_type);
    void drain_into(Army& army);

private:
    std::vector<Slot> _slots;
    std::size_t _max_slot_count;
    int _slot_size;
    Type _type;
    const AcceptableUnits& _acceptable_units;
};
