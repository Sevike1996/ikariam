#include "gtest/gtest.h"

#include "formation.hpp"

inline bool operator==(const Slot& lhs, const Slot& rhs) {
    return lhs.count == rhs.count && lhs.first_health == rhs.first_health && lhs.meta == rhs.meta;
}

TEST(Basic, SingleHitKill) {
    int pool;
    Formation attack(BattleFieldSize::mini, Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::hoplite], 1, UNITS_META[Unit::hoplite].health, pool);
    
    Formation defense(BattleFieldSize::mini, Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);

    attack.hit(defense);

    ASSERT_EQ(defense.getSlots(), std::vector<Slot>{});
}

TEST(Basic, SingleHitAlive) {
    int pool;
    Formation attack(BattleFieldSize::mini, Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearmen], 1, UNITS_META[Unit::spearmen].health, pool);
    
    Formation defense(BattleFieldSize::mini, Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);

    attack.hit(defense);

    std::vector<Slot> expected{{&UNITS_META[Unit::barbarian], 1, 9, pool}};
    ASSERT_EQ(defense.getSlots(), expected);
}

TEST(Basic, DoubleSlotKill) {
    int pool;
    Formation attack(BattleFieldSize::mini, Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearmen], 8, UNITS_META[Unit::hoplite].health, pool);
    
    Formation defense(BattleFieldSize::mini, Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    
    auto dup = attack.copy();
    auto dup2 = defense.copy();
    dup.hit(defense);
    dup2.hit(attack);

    ASSERT_TRUE(defense.getSlots().empty());
}

TEST(Basic, DoubleSlotSingleKill) {
    int pool;
    Formation attack(BattleFieldSize::mini, Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearmen], 7, UNITS_META[Unit::hoplite].health, pool);
    
    Formation defense(BattleFieldSize::mini, Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    
    attack.hit(defense);

    std::vector<Slot> expected{{&UNITS_META[Unit::barbarian], 1, 3, pool}};
    ASSERT_EQ(defense.getSlots(), expected);
}

TEST(Basic, DoubleSlotSingleNoKill) {
    int pool;
    Formation attack(BattleFieldSize::mini, Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearmen], 6, UNITS_META[Unit::hoplite].health, pool);
    
    Formation defense(BattleFieldSize::mini, Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    
    attack.hit(defense);

    std::vector<Slot> expected{{&UNITS_META[Unit::barbarian], 1, 3, pool}, {&UNITS_META[Unit::barbarian], 1, 3, pool}};
    ASSERT_EQ(defense.getSlots(), expected);
}

TEST(Basic, DoubleSlotClash) {
    int pool;
    Formation attack(BattleFieldSize::mini, Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearmen], 8, UNITS_META[Unit::spearmen].health, pool);
    
    Formation defense(BattleFieldSize::mini, Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    
    auto dup = attack.copy();
    auto dup2 = defense.copy();
    dup.hit(defense);
    dup2.hit(attack);

    std::vector<Slot> attack_expected{{&UNITS_META[Unit::spearmen], 7, 12, pool}};

    ASSERT_EQ(attack.getSlots(), attack_expected);
    ASSERT_TRUE(defense.getSlots().empty());
}

TEST(Basic, DoubleSlotFullClash) {
    int pool;
    Formation attack(BattleFieldSize::mini, Formation::Type::front);
    attack.fill_slot(&UNITS_META[Unit::spearmen], 3, UNITS_META[Unit::spearmen].health, pool);
    attack.fill_slot(&UNITS_META[Unit::spearmen], 3, UNITS_META[Unit::spearmen].health, pool);
    
    Formation defense(BattleFieldSize::mini, Formation::Type::front);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    defense.fill_slot(&UNITS_META[Unit::barbarian], 1, UNITS_META[Unit::barbarian].health, pool);
    
    auto dup = attack.copy();
    auto dup2 = defense.copy();
    dup.hit(defense);
    dup2.hit(attack);

    std::vector<Slot> attack_expected{{&UNITS_META[Unit::spearmen], 2, 12, pool}, {&UNITS_META[Unit::spearmen], 3, 13, pool}};
    std::vector<Slot> defense_expected{{&UNITS_META[Unit::barbarian], 1, 6, pool}};

    ASSERT_EQ(attack.getSlots(), attack_expected);
    ASSERT_EQ(defense.getSlots(), defense_expected);
}