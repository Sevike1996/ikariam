#include <gtest/gtest.h>

#include "formation.hpp"
#include "attack_matrix.hpp"
#include "clash.hpp"
#include "utils.hpp"
#include "battlefield.hpp"

TEST(Clash, SingleHitKill) {
    int pool;
    Formation attack(Formation::front);
    attack.fill_slot(&UNITS_META[Unit::hoplite], 1, UNITS_META[Unit::hoplite].health, pool);

    Formation defense(Formation::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);

    Formation expected(Formation::front);
    expected.fill_slot(&UNITS_META[Unit::barbarian], 0, 0, pool);
    expected[0].orig_count = 1;

    clash_formation<NativeAttackMatrix>(attack, defense);

    ASSERT_EQ(defense, expected);
}

TEST(Clash, SingleHitAlive) {
    int pool;
    Formation attack(Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearman], 1, UNITS_META[Unit::spearman].health, pool);
    
    Formation defense(Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);

    Formation expected(Formation::front);
    expected.fill_slot(&UNITS_META[Unit::barbarian], 1, 9, pool);

    clash_formation<NativeAttackMatrix>(attack, defense);

    ASSERT_EQ(defense, expected);
}

TEST(Clash, SimultaneousKill) {
    int pool;
    Formation top(Formation::Type::front);
    top.fill_slot(&UNITS_META[Unit::spearman], 5, UNITS_META[Unit::spearman].health, pool);
    
    Formation bottom(Formation::Type::front);
    bottom.fill_slot(&UNITS_META[Unit::spearman], 5, UNITS_META[Unit::spearman].health, pool);

    Formation expected(Formation::front);
    expected.fill_slot(&UNITS_META[Unit::spearman], 5, 6, pool);
    expected[0].count--;

    NativeAttackMatrix top_matrix(top);
    NativeAttackMatrix bottom_matrix(bottom);

    FormationSlotIterator top_chain(top);
    FormationSlotIterator bottom_chain(bottom);
    
    clash_matrix(top_matrix, bottom_chain);
    clash_matrix(bottom_matrix, top_chain);

    EXPECT_EQ(bottom, expected);
    EXPECT_EQ(top, expected);
}

TEST(Clash, DoubleSlotKill) {
    int pool;
    Formation attack(Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearman], 8, UNITS_META[Unit::hoplite].health, pool);
    
    Formation defense(Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);

    clash_formation<NativeAttackMatrix>(attack, defense);

    ASSERT_TRUE(defense.is_empty());
}

TEST(Clash, DoubleSlotSingleKill) {
    int pool;
    Formation attack(Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearman], 7, UNITS_META[Unit::hoplite].health, pool);
    
    Formation defense(Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    
    clash_formation<NativeAttackMatrix>(attack, defense);

    ASSERT_EQ(defense.get_losses_count(), 1);
}

TEST(Clash, DoubleSlotDoubleKill) {
    int pool;
    Formation attack(Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearman], 8, UNITS_META[Unit::hoplite].health, pool);
    
    Formation defense(Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    
    clash_formation<NativeAttackMatrix>(attack, defense);

    ASSERT_EQ(defense.get_losses_count(), 2);
}

TEST(Clash, RangedMelee) {
    int pool;
    auto spearman_meta = &UNITS_META[Unit::spearman];
    auto archer_meta = &UNITS_META[Unit::archer];

    auto top_army = std::make_shared<Army>(std::make_unique<StatLoader>());
    top_army->reinforce(Unit::spearman, 1);
    BattleField top(top_army, BattleField::small);
    
    auto bottom_army = std::make_shared<Army>(std::make_unique<StatLoader>());
    bottom_army->reinforce(Unit::archer, 1);
    BattleField bottom(bottom_army, BattleField::small);

    clash(top, bottom);

    Formation top_expected(Formation::front);
    int remaining_health = spearman_meta->health - archer_meta->attack - archer_meta->ranged_attack;
    top_expected.fill_slot(spearman_meta, 1, remaining_health, pool);

    Formation bottom_expected(Formation::long_range);
    remaining_health = archer_meta->health - spearman_meta->attack;
    bottom_expected.fill_slot(archer_meta, 1, remaining_health, pool);

    ASSERT_EQ(top.get_formation(Formation::front), top_expected);
    ASSERT_EQ(bottom.get_formation(Formation::long_range), bottom_expected);
}

TEST(Clash, NoDefendingUnits) {
    auto top_army = std::make_shared<Army>(std::make_unique<StatLoader>());
    top_army->reinforce(Unit::spearman, 1);
    BattleField top(top_army, BattleField::small);
    
    auto bottom_army = std::make_shared<Army>(std::make_unique<StatLoader>());
    bottom_army->reinforce(Unit::ram, 1);
    BattleField bottom(bottom_army, BattleField::small);   

    auto* winner = get_winner(bottom, top);
    ASSERT_EQ(winner, &top);
}

TEST(Clash, Draw) {
    auto top_army = std::make_shared<Army>(std::make_unique<StatLoader>());
    top_army->reinforce(Unit::spearman, 1);
    BattleField top(top_army, BattleField::small);
    
    auto bottom_army = std::make_shared<Army>(std::make_unique<StatLoader>());
    bottom_army->reinforce(Unit::steam_giant, 1);
    BattleField bottom(bottom_army, BattleField::small);   

    auto* winner = get_winner(bottom, top);
    ASSERT_EQ(winner, nullptr);
}