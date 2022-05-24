#include "utils.hpp"

std::ostream& operator<<(std::ostream& os, Slot const& slot) {
    const char* name = nullptr;
    for (auto& i : UNIT_TYPES) {
        if (i.second == slot.meta->type) {
            name = i.first.c_str();
        }
    }
    os << "(" << name << ", " << slot.count << "/" << slot.orig_count << ", " << slot.first_health << "/" << slot.meta->health << ")";

    return os;
}

std::ostream& operator<<(std::ostream &os, Formation const &formation) { 
    std::size_t size = formation.size();
    os << "{ ";
    for (std::size_t i = 0; i < size; i++) {
        os << formation[i];
        if (i != size - 1) {
            os << ", ";
        }
    }
    os << " }";

    return os;
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