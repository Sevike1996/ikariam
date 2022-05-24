#include "slot_iterator.hpp"

BattleSlotIterator::BattleSlotIterator(BattleField& battlefield, std::vector<Formation::Type> types) :
    _battlefield(battlefield), _types(std::move(types)), _current(_types.begin()), _hit_slot_index(0)
{
    advance_nonempty_formation();
}

void BattleSlotIterator::advance_nonempty_formation() {
    while (_battlefield.get_formation(*_current).is_empty()) {
        _current++;
        if (is_done()) {
            return;
        }
        _hit_slot_index = 0;
    }
}

Slot* BattleSlotIterator::operator->()
{
    Formation& current = _battlefield.get_formation(*_current);
    return &(current[_hit_slot_index]);
}

void BattleSlotIterator::advance()
{
    advance_nonempty_formation();
    if (is_done()) {
        return;
    }
    Formation& current = _battlefield.get_formation(*_current);
    _hit_slot_index = current.get_next_occupied_index(_hit_slot_index);
}

bool BattleSlotIterator::is_done()
{
    return _current == _types.end();
}

FormationSlotIterator::FormationSlotIterator(Formation& formation) : _formation(formation), _hit_slot_index(0)
{
}

Slot* FormationSlotIterator::operator->()
{
    return &(_formation[_hit_slot_index]);
}

void FormationSlotIterator::advance()
{
    if (is_done()) {
        return;
    }
    _hit_slot_index = _formation.get_next_occupied_index(_hit_slot_index);
}

bool FormationSlotIterator::is_done()
{
    return _formation.is_empty();
}