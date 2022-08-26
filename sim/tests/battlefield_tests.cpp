#include "gtest/gtest.h"

#include "battlefield.hpp"
#include "army.hpp"
#include "utils.hpp"

TEST(Basic, FrontFill) {
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    Army army(std::move(std::make_unique<StatLoader>()));
    army.reinforce(Unit::spearman, 10);
    BattleField battlefield(army, BattleField::mini, "user", DUMMY_MORALE);

    Formation expected(Formation::front);
    expected.fill_slot(spearman_meta, 10, spearman_meta->health, pool);
    ASSERT_EQ(battlefield.get_formation(Formation::front), expected);
}

TEST(Basic, FrontFlood) {
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    Army army(std::move(std::make_unique<StatLoader>()));
    army.reinforce(Unit::spearman, 100);
    BattleField battlefield(army, BattleField::mini, "user", DUMMY_MORALE);

    Formation expected(Formation::front);
    for (int i = 0; i < 3; i++) {
        expected.fill_slot(spearman_meta, 30, spearman_meta->health, pool);
    }
    ASSERT_EQ(battlefield.get_formation(Formation::front), expected);
}

TEST(Basic, FrontFlankOverflow) {
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    Army army(std::move(std::make_unique<StatLoader>()));
    army.reinforce(Unit::spearman, 170);
    BattleField battlefield(army, BattleField::small, "user", DUMMY_MORALE);

    Formation expected(Formation::flank);
    expected.fill_slot(spearman_meta, 20, spearman_meta->health, pool);

    ASSERT_EQ(battlefield.get_formation(Formation::flank), expected);
}

TEST(Basic, ArtilleryPrio) {
    int pool;
    const UnitMeta* mortar_meta = &(UNITS_META[Unit::mortar]);

    Army army(std::move(std::make_unique<StatLoader>()));
    army.reinforce(Unit::mortar, 7);
    army.reinforce(Unit::ram, 6);
    BattleField battlefield(army, BattleField::small, "user", DUMMY_MORALE);

    Formation expected(Formation::artillery);
    expected.fill_slot(mortar_meta, 6, mortar_meta->health, pool);
    expected.fill_slot(mortar_meta, 1, mortar_meta->health, pool);

    ASSERT_EQ(battlefield.get_formation(Formation::artillery), expected);
}
