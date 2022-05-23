#pragma once

#include "formation.hpp"
#include "battlefield.hpp"
#include "attack_matrix.hpp"
#include "slot_iterator.hpp"

void clash(BattleField& top, BattleField& bottom);

void clash_matrix(AttackMatrix& matrix, SlotIterator& slots);