#pragma once

#include <array>
#include <vector>

#include "battlefield.hpp"
#include "unit.hpp"

struct BuildingLevels
{
    int town_hall;
    int wall;
    int trade_post;
    int shipyard;
};

enum class BattleType
{
    LAND,
    NAVAL,
};

struct BattleMeta
{
    static constexpr std::size_t formation_count = Formation::Type::type_count;
    const std::array<BattleField::SlotInfo, formation_count>&  battlefield_size;
    const std::array<std::vector<Unit>, formation_count>& acceptable_units;
    int garrison_limit;
};

BattleMeta get_battle_size(const BuildingLevels& levels, BattleType battle_type);
