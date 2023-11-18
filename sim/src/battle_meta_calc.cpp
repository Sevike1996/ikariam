#include "battle_meta.hpp"
#include "battle_meta_calc.hpp"
#include "battlefield.hpp"

const SlotInfo LAND_FORMATIONS_SIZE[][BattleMeta::formation_count] = {
    {{1, 10}, {1, 10}, {1, 30}, {3, 30}, {3, 30}, {0, 0}},
    {{1, 20}, {1, 20}, {2, 30}, {5, 30}, {5, 30}, {2, 30}},
    {{1, 30}, {1, 30}, {3, 30}, {7, 30}, {7, 30}, {4, 30}},
    {{2, 20}, {2, 20}, {4, 30}, {7, 40}, {7, 40}, {6, 30}},
    {{2, 30}, {2, 30}, {5, 30}, {7, 50}, {7, 50}, {6, 40}},
};

const SlotInfo NAVAL_FORMATIONS_SIZE[][BattleMeta::formation_count] = {
    {{1, 10}, {1, 10}, {1, 15}, {3, 15}, {3, 15}, {0, 0}},
    {{1, 10}, {1, 10}, {2, 15}, {5, 15}, {5, 15}, {2, 15}},
    {{1, 15}, {1, 15}, {3, 15}, {7, 15}, {7, 15}, {4, 15}},
    {{2, 10}, {2, 10}, {4, 15}, {7, 20}, {7, 20}, {6, 15}},
    {{2, 15}, {2, 15}, {5, 15}, {7, 25}, {7, 25}, {6, 20}},
};

const std::vector<Unit> ACCEPTABLE_LAND_UNITS[BattleMeta::formation_count] = {
    {Unit::gyrocopter},
    {Unit::bombardier},
    {Unit::mortar, Unit::catapult, Unit::ram},
    {Unit::carbineer, Unit::archer, Unit::slinger},
    {Unit::wall, Unit::steam_giant, Unit::hoplite, Unit::spearman, Unit::swordsman, Unit::slinger, Unit::carbineer,
        Unit::archer},
    {Unit::swordsman, Unit::spearman},
};

const std::vector<Unit> ACCEPTABLE_NAVAL_UNITS[BattleMeta::formation_count] = {
    {Unit::paddle_speedboat},
    {Unit::balloon_carrier},
    {Unit::diving_boat, Unit::rocket_ship},
    {Unit::mortar_ship, Unit::catapult_ship, Unit::ballista_ship},
    {Unit::steam_ram, Unit::fire_ship, Unit::ram_ship},
    {Unit::ram_ship},
};

BattleFieldSize get_land_battlefield_size(const BuildingLevels& levels)
{
    int level = levels.town_hall;
    if (level <= 4) {
        return BattleFieldSize::mini;
    } else if (level <= 9) {
        return BattleFieldSize::small;
    } else if (level <= 16) {
        return BattleFieldSize::medium;
    } else if (level <= 24) {
        return BattleFieldSize::large;
    } else {
        return BattleFieldSize::big;
    }
}

BattleFieldSize get_navel_battlefield_size(const BuildingLevels& levels)
{
    int level = std::max(levels.trade_port, levels.shipyard);
    if (level <= 7) {
        return BattleFieldSize::mini;
    } else if (level <= 14) {
        return BattleFieldSize::small;
    } else if (level <= 21) {
        return BattleFieldSize::medium;
    } else if (level <= 28) {
        return BattleFieldSize::large;
    } else {
        return BattleFieldSize::big;
    }
}

int get_land_garrison_limit(const BuildingLevels& levels)
{
    return 250 + (50 * (levels.town_hall + levels.wall));
}

int get_naval_garrison_limit(const BuildingLevels& levels)
{
    return 125 + (25 * std::max(levels.trade_port, levels.shipyard));
}

BattleMeta LandBattleMetaCalc::calc_battle_meta(const BuildingLevels& levels)
{
    auto size = get_land_battlefield_size(levels);
    return BattleMeta{
        size,
        BattleMeta::FormationSizes{LAND_FORMATIONS_SIZE[size]},
        BattleMeta::AcceptableUnits{ACCEPTABLE_LAND_UNITS},
        get_land_garrison_limit(levels),
    };
}

BattleMeta NavalBattleMetaCalc::calc_battle_meta(const BuildingLevels& levels)
{
    auto size = get_navel_battlefield_size(levels);
    return BattleMeta{
        size,
        BattleMeta::FormationSizes{NAVAL_FORMATIONS_SIZE[size]},
        BattleMeta::AcceptableUnits{ACCEPTABLE_NAVAL_UNITS},
        get_naval_garrison_limit(levels),
    };
}

std::unique_ptr<BattleMetaCalc> create_battle_meta_calc(BattleType battle_type)
{
    switch (battle_type) {
    case BattleType::LAND:
        return std::make_unique<LandBattleMetaCalc>();
    case BattleType::NAVAL:
        return std::make_unique<NavalBattleMetaCalc>();
    default:
        throw std::invalid_argument(std::to_string((int)battle_type) + " is invalid battle type");
    }
}
