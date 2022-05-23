#include "clash.hpp"
#include "attack_matrix.hpp"
#include "slot_iterator.hpp"

void clash(BattleField& top, BattleField& bottom)
{
    for (int type = 0; type < Formation::type_count; type++) {
        Formation& top_attacking = top.get_formation(static_cast<Formation::Type>(type));
        Formation& bottom_attacking = bottom.get_formation(static_cast<Formation::Type>(type));

        NativeAttackMatrix top_matrix(top_attacking);
        NativeAttackMatrix bottom_matrix(bottom_attacking);

        BattleSlotIterator top_chain(top, top_attacking.get_attack_order());
        BattleSlotIterator bottom_chain(bottom, bottom_attacking.get_attack_order());
        
        clash_matrix(top_matrix, bottom_chain);
        clash_matrix(bottom_matrix, top_chain);
    }

    bool top_lost_more = top.get_losses_count() < bottom.get_losses_count();
    top.reduce_morale(top_lost_more);
    bottom.reduce_morale(!top_lost_more);
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