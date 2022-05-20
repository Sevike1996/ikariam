#pragma once

#include <vector>

#include "formation.hpp"
#include "battlefield.hpp"

class SlotChain {
public:
    SlotChain(BattleField& battlefield, std::vector<Formation::Type> types);

    Slot& operator*();
    Slot* operator->();

    void advance();
    bool is_done();


private:
    void advance_nonempty_formation();

    BattleField& _battlefield;
    std::vector<Formation::Type> _types;
    std::vector<Formation::Type>::iterator _current;
    int _hit_slot_index;
};