#include "city.hpp"

const BattleField::SlotInfo LAND_BATTLE_FIELD_SIZES[][BattleMeta::formation_count] = {
    {{1, 10}, {1, 10}, {1, 30}, {3, 30}, {3, 30}, {0, 0}},
    {{1, 20}, {1, 20}, {2, 30}, {5, 30}, {5, 30}, {2, 30}},
    {{1, 30}, {1, 30}, {3, 30}, {7, 30}, {7, 30}, {4, 30}},
    {{2, 20}, {2, 20}, {4, 30}, {7, 40}, {7, 40}, {6, 30}},
    {{2, 30}, {2, 30}, {5, 30}, {7, 50}, {7, 50}, {6, 40}},
};

// TODO correct this
const BattleField::SlotInfo NAVEL_BATTLE_FIELD_SIZES[][BattleMeta::formation_count] = {
    {{1, 10}, {1, 10}, {1, 30}, {3, 30}, {3, 30}, {0, 0}},
    {{1, 20}, {1, 20}, {2, 30}, {5, 30}, {5, 30}, {2, 30}},
    {{1, 30}, {1, 30}, {3, 30}, {7, 30}, {7, 30}, {4, 30}},
    {{2, 20}, {2, 20}, {4, 30}, {7, 40}, {7, 40}, {6, 30}},
    {{2, 30}, {2, 30}, {5, 30}, {7, 50}, {7, 50}, {6, 40}},
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

// TODO check this
const std::vector<Unit> ACCEPTABLE_NAVAL_UNITS[BattleMeta::formation_count] = {
    {Unit::paddle_speedboat},
    {Unit::balloon_carrier},
    {Unit::diving_boat, Unit::rocket_ship},
    {Unit::mortar_ship, Unit::catapult_ship, Unit::ballista_ship},
    {Unit::steam_ram, Unit::fire_ship, Unit::ram_ship},
    {Unit::ram_ship},
};

BattleField::BattleFieldSize get_battlefield_size(int town_hall_level)
{
    if (town_hall_level <= 4) {
        return BattleField::mini;
    } else if (town_hall_level <= 9) {
        return BattleField::small;
    } else if (town_hall_level <= 16) {
        return BattleField::medium;
    } else if (town_hall_level <= 24) {
        return BattleField::large;
    } else {
        return BattleField::big;
    }
}

int get_land_garrison_limit(const BuildingLevels& levels)
{
    return 250 + (50 * (levels.town_hall + levels.wall));
}

int get_naval_garrison_limit(const BuildingLevels& levels)
{
    return 125 + (25 * std::max(levels.trade_post, levels.shipyard));

}

