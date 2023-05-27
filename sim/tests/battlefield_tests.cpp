#include "gtest/gtest.h"

#include "battlefield.hpp"
#include "army.hpp"
#include "utils.hpp"

TEST(Battlefield, FrontFill) {
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    auto army = std::make_shared<Army>(std::make_unique<StatLoader>());
    army->reinforce(Unit::spearman, 10);
    BattleField battlefield(BattleField::mini);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::front);
    expected.fill_slot(spearman_meta, 10, spearman_meta->health, pool);
    ASSERT_EQ(battlefield.get_formation(Formation::front), expected);
}

TEST(Battlefield, FrontFlood) {
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    auto army = std::make_shared<Army>(std::make_unique<StatLoader>());
    army->reinforce(Unit::spearman, 100);
    BattleField battlefield(BattleField::mini);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::front);
    for (int i = 0; i < 3; i++) {
        expected.fill_slot(spearman_meta, 30, spearman_meta->health, pool);
    }
    ASSERT_EQ(battlefield.get_formation(Formation::front), expected);
}

TEST(Battlefield, FrontFlankOverflow) {
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    auto army = std::make_shared<Army>(std::make_unique<StatLoader>());
    army->reinforce(Unit::spearman, 170);
    BattleField battlefield(BattleField::small);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::flank);
    expected.fill_slot(spearman_meta, 20, spearman_meta->health, pool);

    ASSERT_EQ(battlefield.get_formation(Formation::flank), expected);
}

TEST(Battlefield, ArtilleryPrio) {
    int pool;
    const UnitMeta* mortar_meta = &(UNITS_META[Unit::mortar]);

    auto army = std::make_shared<Army>(std::make_unique<StatLoader>());
    army->reinforce(Unit::mortar, 7);
    army->reinforce(Unit::ram, 6);
    BattleField battlefield(BattleField::small);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::artillery);
    expected.fill_slot(mortar_meta, 6, mortar_meta->health, pool);
    expected.fill_slot(mortar_meta, 1, mortar_meta->health, pool);

    ASSERT_EQ(battlefield.get_formation(Formation::artillery), expected);
}
