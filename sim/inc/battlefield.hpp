#pragma once

#include <array>

#include "army.hpp"
#include "formation.hpp"

class BattleField
{
public:
    enum BattleFieldSize {
        mini,
        small,
        medium,
        large,
        big,
    };

    struct SlotInfo {
        std::size_t amount;
        int size;
    };

    BattleField(BattleFieldSize size);
    void fill(Army& army);
    void drain_into(Army& army);

    bool can_defend() const;
    int get_units_count() const;
    int get_losses_count() const;

    void set_formation(Formation::Type type, Formation formation);
    Formation& get_formation(Formation::Type type);
    const Formation& get_formation(Formation::Type type) const;

    static const SlotInfo BATTLE_FIELD_SIZES[][Formation::Type::type_count];
    static BattleFieldSize get_size(int town_hall_level);

private:
    Formation create_formation(Formation::Type type);
    void fill_formation(Formation& formation, const SlotInfo& slot_info, Unit type);
    bool has_spare(Formation::Type type) const;

    std::vector<Formation> _formations;
    BattleFieldSize _size;
};
