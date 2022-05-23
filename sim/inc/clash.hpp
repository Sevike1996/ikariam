#pragma once

#include "formation.hpp"
#include "battlefield.hpp"
#include "attack_matrix.hpp"
#include "slot_iterator.hpp"

void clash(BattleField& top, BattleField& bottom);

template<typename MatrixT>
void clash_formation(Formation& attacking, BattleField& defending)
{
    MatrixT matrix(attacking);
    BattleSlotIterator slot_chain(defending, attacking.get_attack_order());
    clash_matrix(matrix, slot_chain);
}

void clash_matrix(AttackMatrix& matrix, SlotIterator& slots);