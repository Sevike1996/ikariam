#include "clash.hpp"
#include "attack_matrix.hpp"
#include "slot_chain.hpp"

void clash(BattleField& top, BattleField& bottom)
{
    for (int type = 0; type < Formation::type_count; type++) {
        Formation& top_attacking = top.get_formation(static_cast<Formation::Type>(type));
        Formation& bottom_attacking = bottom.get_formation(static_cast<Formation::Type>(type));

        clash_formation(top_attacking, bottom);
        clash_formation(bottom_attacking, top);
    }

    bool top_lost_more = top.get_losses_count() < bottom.get_losses_count();
    top.reduce_morale(top_lost_more);
    bottom.reduce_morale(!top_lost_more);
}

void clash_formation(Formation& attacking, BattleField& defending)
{
    AttackMatrix am(attacking);
    SlotChain slot_chain(defending, attacking.get_attack_order());
    while (!am.is_done() && !slot_chain.is_done()) {
        auto damage = am.calc_row_damage();
        slot_chain->apply_damage(damage);

        am.advance();
        slot_chain.advance();
    }
}