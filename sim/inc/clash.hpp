#pragma once

#include <optional>

#include "formation.hpp"
#include "battlefield.hpp"
#include "attack_matrix.hpp"
#include "slot_iterator.hpp"

void clash(BattleField& top, BattleField& bottom);

void clash_matrix(AttackMatrix& matrix, SlotIterator& slots);

template<typename MatrixT>
void clash_formation(Formation& attacking, Formation& defending)
{
    MatrixT matrix(attacking);
    FormationSlotIterator slot_chain(defending);
    clash_matrix(matrix, slot_chain);
}

BattleField* get_winner(BattleField& top, BattleField& bottom);