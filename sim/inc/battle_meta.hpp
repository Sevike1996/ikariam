#pragma once

#include <span>
#include <vector>

#include "formation.hpp"
#include "unit.hpp"

struct BuildingLevels
{
    int town_hall;
    int wall;
    int trade_port;
    int shipyard;
};

enum class BattleType
{
    LAND,
    NAVAL,
};

enum BattleFieldSize {
    mini,
    small,
    medium,
    large,
    big,
};

struct SlotInfo {
    std::size_t amount;
    int size;
};

struct BattleMeta
{
    static constexpr std::size_t formation_count = Formation::Type::type_count;
    using FormationSizes = std::span<const SlotInfo, formation_count>;
    using AcceptableUnits = std::span<const std::vector<Unit>, formation_count>;

    BattleFieldSize size;
    FormationSizes formations_size;
    AcceptableUnits acceptable_units;
    int garrison_limit;
};
