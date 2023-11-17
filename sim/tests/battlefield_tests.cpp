#include "gtest/gtest.h"

#include "army.hpp"
#include "battlefield.hpp"
#include "utils.hpp"

TEST(Battlefield, FrontFill)
{
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    Army army(mock_army_improvements());
    army.reinforce(Unit::spearman, 10);
    BattleField battlefield(BattleField::mini);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::front);
    expected.fill_slot(spearman_meta, 10, spearman_meta->health, pool);
    ASSERT_EQ(battlefield.get_formation(Formation::front), expected);
}

TEST(Battlefield, FrontFlood)
{
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    Army army(mock_army_improvements());
    army.reinforce(Unit::spearman, 100);
    BattleField battlefield(BattleField::mini);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::front);
    for (int i = 0; i < 3; i++) {
        expected.fill_slot(spearman_meta, 30, spearman_meta->health, pool);
    }
    ASSERT_EQ(battlefield.get_formation(Formation::front), expected);
}

TEST(Battlefield, FrontFlankOverflow)
{
    int pool;
    const UnitMeta* spearman_meta = &(UNITS_META[Unit::spearman]);

    Army army(mock_army_improvements());
    army.reinforce(Unit::spearman, 170);
    BattleField battlefield(BattleField::small);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::flank);
    expected.fill_slot(spearman_meta, 20, spearman_meta->health, pool);

    ASSERT_EQ(battlefield.get_formation(Formation::flank), expected);
}

TEST(Battlefield, ArtilleryPrio)
{
    int pool;
    const UnitMeta* mortar_meta = &(UNITS_META[Unit::mortar]);

    Army army(mock_army_improvements());
    army.reinforce(Unit::mortar, 7);
    army.reinforce(Unit::ram, 6);
    BattleField battlefield(BattleField::small);
    battlefield.fill(army);

    Formation expected = dummy_formation(Formation::artillery);
    expected.fill_slot(mortar_meta, 6, mortar_meta->health, pool);
    expected.fill_slot(mortar_meta, 1, mortar_meta->health, pool);

    ASSERT_EQ(battlefield.get_formation(Formation::artillery), expected);
}

TEST(Battlefield, FillAndDrain)
{
    Army army(mock_army_improvements());
    army.reinforce(Unit::hoplite, 30);
    army.reinforce(Unit::archer, 20);
    army.reinforce(Unit::ram, 10);

    BattleField battlefield(BattleField::small);
    battlefield.fill(army);

    ASSERT_TRUE(army.get_reserves().empty());

    battlefield.drain_into(army);
    std::map<Unit, int> expected = {
        {Unit::hoplite, 30},
        {Unit::archer, 20},
        {Unit::ram, 10},
    };
    ASSERT_EQ(army.get_reserves(), expected);
}
