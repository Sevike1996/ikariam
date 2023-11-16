#include "gtest/gtest.h"

#include "formation.hpp"
#include "utils.hpp"

TEST(Formation, SingleNextIndex) {
    int pool;
    Formation attack = dummy_formation(Formation::front);
    attack.fill_slot(&UNITS_META[Unit::spearman], 7, UNITS_META[Unit::hoplite].health, pool);
    ASSERT_EQ(attack.get_next_occupied_index(0), 0);
}

TEST(Formation, TrivialNextIndex) {
    int pool;
    Formation attack = dummy_formation(Formation::front);
    attack.fill_slot(&UNITS_META[Unit::spearman], 7, UNITS_META[Unit::hoplite].health, pool);
    attack.fill_slot(&UNITS_META[Unit::spearman], 7, UNITS_META[Unit::hoplite].health, pool);

    ASSERT_EQ(attack.get_next_occupied_index(0), 1);
}

TEST(Formation, WrapAroundNextIndex) {
    int pool;
    Formation attack = dummy_formation(Formation::front);
    attack.fill_slot(&UNITS_META[Unit::spearman], 7, UNITS_META[Unit::hoplite].health, pool);
    attack.fill_slot(&UNITS_META[Unit::spearman], 7, UNITS_META[Unit::hoplite].health, pool);

    ASSERT_EQ(attack.get_next_occupied_index(1), 0);
}

TEST(Formation, FillWithAmmo) {
    Army army(mock_army_improvements());
    army.reinforce_no_ammo(Unit::archer, 1);
    Formation formation(Formation::long_range, 1, 1);
    formation.fill(army);

    ASSERT_TRUE(formation.is_empty());
}

TEST(Formation, NoFillWithoutAmmo) {
    Army army(mock_army_improvements());
    army.reinforce_no_ammo(Unit::archer, 1);
    Formation formation(Formation::long_range, 1, 1);
    formation.fill(army);

    ASSERT_TRUE(formation.is_empty());
}

