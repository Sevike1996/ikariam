#include "gtest/gtest.h"

#include "army.hpp"
#include "utils.hpp"

TEST(Army, NoAmmoForMelee)
{
    Army army(mock_army_improvements());
    army.reinforce(Unit::spearman, 1);
    army.reinforce(Unit::archer, 1);

    std::map<Unit, int> expected{
        {Unit::archer, UNITS_META[Unit::archer].ammo},
    };
    ASSERT_EQ(army.get_ammo(), expected);

    std::map<Unit, float> expected_percentage{
        {Unit::archer, 1},
    };
    ASSERT_EQ(army.get_ammo_percentage(), expected_percentage);
}

TEST(Army, ZeroAmmoForRanged)
{
    Army army(mock_army_improvements());
    army.reinforce_no_ammo(Unit::archer, 1);

    std::map<Unit, int> expected{
        {Unit::archer, 0},
    };
    ASSERT_EQ(army.get_ammo(), expected);

    std::map<Unit, float> expected_percentage{
        {Unit::archer, 0},
    };
    ASSERT_EQ(army.get_ammo_percentage(), expected_percentage);
}

TEST(Army, BorrowMelee)
{
    auto army = std::make_shared<Army>(mock_army_improvements());
    army->reinforce(Unit::spearman, 1);
    ASSERT_EQ(army->borrow_squad(Unit::spearman, 1)->count, 1);
}

TEST(Army, BorrowRangedWithAmmo)
{
    auto army = std::make_shared<Army>(mock_army_improvements());
    army->reinforce(Unit::archer, 1);
    ASSERT_EQ(army->borrow_squad(Unit::archer, 1)->count, 1);
}

TEST(Army, NoBorrowRangedWithouAmmo)
{
    auto army = std::make_shared<Army>(mock_army_improvements());
    army->reinforce_no_ammo(Unit::archer, 1);
    ASSERT_EQ(army->borrow_squad(Unit::archer, 1), std::nullopt);
}

TEST(Army, PartialBorrowRanged)
{
    auto army = std::make_shared<Army>(mock_army_improvements());
    army->reinforce_no_ammo(Unit::archer, 5);
    army->add_ammo(Unit::archer, 3);
    ASSERT_EQ(army->borrow_squad(Unit::archer, 4)->count, 3);

}

TEST(Army, BorrowSlotSizeEnforced)
{
    auto army = std::make_shared<Army>(mock_army_improvements());
    army->reinforce(Unit::spearman, 10);
    ASSERT_EQ(army->borrow_squad(Unit::spearman, 5)->count, 5);
}

