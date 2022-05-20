#include "attack_matrix.hpp"

AttackMatrix::AttackMatrix(Formation &formation) : _formation(formation), _row(0), _row_count(_formation.get_biggest_slot_size())
{
}

AttackInfo AttackMatrix::calc_row_damage() const
{
    AttackInfo info = {0, 0};
    for (std::size_t i = 0; i < _formation.size(); i++)
    {
        Slot &attacking = _formation[i];
        if (attacking.count > static_cast<int>(_row))
        {
            info.damage += attacking.meta->attack;
            info.unit_count++;
        }
    }
    return info;
}

void AttackMatrix::advance()
{
    _row++;
}

bool AttackMatrix::is_done()
{
    return _row >= _row_count;
}
