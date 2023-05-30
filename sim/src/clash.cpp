#include "clash.hpp"
#include "attack_matrix.hpp"
#include "slot_iterator.hpp"

/**
 * @brief Simulate the damage a special attack case:
 * Enemy's front line is empty front, so when the ranged and artillery are attacked, they inflict their melee damage.
 * 
 * @param defending 
 * @param attacking 
 */
void ranged_melee_hit(BattleField& defending, Formation& attacking);

void clash(BattleField& top, BattleField& bottom)
{
    for (int type = 0; type < Formation::type_count; type++) {
        Formation& top_attacking = top.get_formation(static_cast<Formation::Type>(type));
        Formation& bottom_attacking = bottom.get_formation(static_cast<Formation::Type>(type));

        NativeAttackMatrix top_matrix(top_attacking);
        NativeAttackMatrix bottom_matrix(bottom_attacking);

        if (type == Formation::front) {
            ranged_melee_hit(top, bottom_attacking);
            ranged_melee_hit(bottom, top_attacking);
        }

        BattleSlotIterator top_chain(top, top_attacking.get_attack_order());
        BattleSlotIterator bottom_chain(bottom, bottom_attacking.get_attack_order());
        
        clash_matrix(top_matrix, bottom_chain);
        clash_matrix(bottom_matrix, top_chain);
    }
}

void clash_matrix(AttackMatrix& matrix, SlotIterator& slots)
{
    while (!matrix.is_done() && !slots.is_done()) {
        auto damage = matrix.calc_row_damage();
        slots->apply_damage(damage);

        matrix.advance();
        slots.advance();
    }
}

void ranged_melee_hit(BattleField& defending, Formation& attacking)
{
    if (defending.get_formation(Formation::front).is_empty()) {
        clash_formation<MeleeAttackMatrix>(defending.get_formation(Formation::long_range), attacking);
        clash_formation<MeleeAttackMatrix>(defending.get_formation(Formation::artillery), attacking);   
    }
}

bool has_spare(std::shared_ptr<Army> army, Formation::Type type)
{
    for (auto unit_type : Formation::ACCEPTABLE_UNITS[type]) {
        if (army->get_spare_count(unit_type) != 0) {
            return true;
        }
    }
    return false;
}

bool can_defend(const BattleField& battlefield, const std::shared_ptr<Army> army)
{
    Formation::Type DEFENDING_FROMATION_TYPES[] = {Formation::front, Formation::flank, Formation::long_range};
    for (auto type : DEFENDING_FROMATION_TYPES) {
        if (!battlefield.get_formation(type).is_empty()) {
            return true;
        }
        if (has_spare(army, type)) {
            return true;
        }
    }

    return false;
}

BattleField* get_winner(BattleField& top, const std::shared_ptr<Army> top_army, 
    BattleField& bottom, const std::shared_ptr<Army> bottom_army)
{
    if (!can_defend(top, top_army)) {
        return &bottom;
    } else if (!can_defend(bottom, bottom_army)) {
        return &top;
    }
    return nullptr;
}