#pragma once

#include "army.hpp"
#include "formation.hpp"
#include "battle_meta.hpp"

class BattleField
{
public:
    BattleField(const BattleMeta& battle_meta);
    void fill(Army& army);
    void drain_into(Army& army);

    bool can_defend() const;
    int get_units_count() const;
    int get_losses_count() const;

    Formation& get_formation(Formation::Type type);
    const Formation& get_formation(Formation::Type type) const;

private:
    Formation create_formation(Formation::Type type);
    void fill_formation(Formation& formation, const SlotInfo& slot_info, Unit type);
    bool has_spare(Formation::Type type) const;

    std::vector<Formation> _formations;
};
