#pragma once

#include <tuple>

#include "formation.hpp"

class AttackMatrix {
public:
    AttackMatrix(Formation& formation);

    virtual AttackInfo calc_row_damage() const = 0;

    void advance();
    bool is_done();

protected:
    Formation& _formation;
    std::size_t _row;

private:
    std::size_t _row_count;
};

class MeleeAttackMatrix : public AttackMatrix {
public:
    MeleeAttackMatrix(Formation& formation);

    AttackInfo calc_row_damage() const override;
};

class NativeAttackMatrix : public AttackMatrix {
public:
    NativeAttackMatrix(Formation& formation);

    AttackInfo calc_row_damage() const override;
};