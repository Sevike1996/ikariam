#include "slot_chain.hpp"

SlotChain::SlotChain(BattleField& battlefield, std::vector<Formation::Type> types) :
    _battlefield(battlefield), _types(std::move(types)), _current(_types.begin()), _hit_slot_index(0)
{
    advance_nonempty_formation();
}

void SlotChain::advance_nonempty_formation() {
    while (_battlefield.get_formation(*_current).is_empty()) {
        _current++;
        if (is_done()) {
            return;
        }
        _hit_slot_index = 0;
    }
}

Slot& SlotChain::operator*()
{
    Formation& current = _battlefield.get_formation(*_current);
    return current[_hit_slot_index];
}

Slot* SlotChain::operator->()
{
    Formation& current = _battlefield.get_formation(*_current);
    return &(current[_hit_slot_index]);
}

void SlotChain::advance()
{
    advance_nonempty_formation();
    if (is_done()) {
        return;
    }
    Formation& current = _battlefield.get_formation(*_current);
    _hit_slot_index = current.get_next_occupied_index(_hit_slot_index);
}

bool SlotChain::is_done()
{
    return _current == _types.end();
}
