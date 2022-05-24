#pragma once

#include <vector>

#include "formation.hpp"
#include "battlefield.hpp"

class SlotIterator {
public:
    virtual Slot* operator->() = 0;

    virtual void advance() = 0;
    virtual bool is_done() = 0;
};

class BattleSlotIterator : public SlotIterator {
public:
    BattleSlotIterator(BattleField& battlefield, std::vector<Formation::Type> types);

    Slot* operator->() override;

    void advance() override;
    bool is_done() override;


private:
    void advance_nonempty_formation();

    BattleField& _battlefield;
    std::vector<Formation::Type> _types;
    std::vector<Formation::Type>::iterator _current;
    int _hit_slot_index;
};


class FormationSlotIterator : public SlotIterator {
public:
    FormationSlotIterator(Formation& formation);
    
    Slot* operator->() override;

    void advance() override;
    bool is_done() override;
private:
    Formation& _formation;
    int _hit_slot_index;
};
