#include <tuple>

#include "formation.hpp"

class AttackMatrix {
public:
    AttackMatrix(Formation& formation);

    AttackInfo calc_row_damage() const;

    void advance();
    bool is_done();

private:
    Formation& _formation;
    std::size_t _row;
    std::size_t _row_count;
};
