#include "battlefield.hpp"

BattleField::BattleField(const BattleMeta& battle_meta)
{
    for (int type = 0; type < Formation::type_count; type++) {
        auto [max_slot_count, slot_size] = battle_meta.formations_size[type];
        _formations.emplace_back(static_cast<Formation::Type>(type), max_slot_count, slot_size, battle_meta.acceptable_units[type]);
    }
}

void BattleField::fill(Army& army)
{
    for (auto& formation : _formations)
    {
        formation.fill(army);
    }
}

void BattleField::drain_into(Army& army)
{
    for (auto& formation : _formations)
    {
        formation.drain_into(army);
    }
}

int BattleField::get_units_count() const
{
    int count = 0;
    for (const auto& formation : _formations) {
        count += formation.get_units_count();
    }
    return count;
}

int BattleField::get_losses_count() const
{
    int count = 0;
    for (const auto& formation : _formations) {
        count += formation.get_losses_count();
    }
    return count;
}

Formation& BattleField::get_formation(Formation::Type type)
{
    return _formations[type];
}

const Formation& BattleField::get_formation(Formation::Type type) const
{
    return _formations[type];
}
