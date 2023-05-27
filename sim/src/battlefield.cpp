#include "battlefield.hpp"

const BattleField::SlotInfo BattleField::BATTLE_FIELD_SIZES[][Formation::Type::type_count] = {
    {{1, 10}, {1, 10}, {1, 30}, {3, 30}, {3, 30}, {0, 0}},
    {{1, 20}, {1, 20}, {2, 30}, {5, 30}, {5, 30}, {2, 30}},
    {{1, 30}, {1, 30}, {3, 30}, {7, 30}, {7, 30}, {4, 30}},
    {{2, 20}, {2, 20}, {4, 30}, {7, 40}, {7, 40}, {6, 30}},
    {{2, 30}, {2, 30}, {5, 30}, {7, 50}, {7, 50}, {6, 40}},
};

BattleField::BattleField(BattleFieldSize size):
    _size(size)
{
    for (int type = 0; type < Formation::type_count; type++) {
        auto [max_slot_count, slot_size] = BATTLE_FIELD_SIZES[_size][type];
        _formations.emplace_back(static_cast<Formation::Type>(type), max_slot_count, slot_size);
    }
}

void BattleField::fill(std::shared_ptr<Army> army)
{
    for (auto& formation : _formations)
    {
        formation.fill(army);
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

void BattleField::set_formation(Formation::Type type, Formation formation)
{
    _formations[type] = std::move(formation);
}

Formation& BattleField::get_formation(Formation::Type type)
{
    return _formations[type];
}

const Formation& BattleField::get_formation(Formation::Type type) const
{
    return _formations[type];
}

void BattleField::set_army(std::shared_ptr<Army> army)
{
    _army = army;
}

const std::shared_ptr<Army> BattleField::get_army() const
{
    return _army;
}
