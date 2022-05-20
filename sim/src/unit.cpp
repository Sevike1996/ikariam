#include "unit.hpp"

const std::map<std::string, Unit> UNIT_TYPES = {
    {"hoplite", Unit::hoplite},
    {"steamgiant", Unit::steam_giant},
    {"spearman", Unit::spearman},
    {"swordsman", Unit::swordsman},
    {"slinger", Unit::slinger},
    {"archer", Unit::archer},
    {"carbineer", Unit::carbineer},
    {"ram", Unit::ram},
    {"catapult", Unit::catapult},
    {"mortar", Unit::mortar},
    {"gyrocopter", Unit::gyrocopter},
    {"bombardier", Unit::bombardier},
    {"cook", Unit::cook},
    {"doctor", Unit::doctor},
    {"barbarian", Unit::barbarian},
    {"ram_ship", Unit::ram_ship},
    {"fire_ship", Unit::fire_ship},
    {"paddle_speedboat", Unit::paddle_speedboat},
    {"ballista_ship", Unit::ballista_ship},
    {"catapult_ship", Unit::catapult_ship},
    {"mortar_ship", Unit::mortar_ship},
    {"diving_boat", Unit::diving_boat},
    {"steam_ram", Unit::steam_ram},
    {"rocket_ship", Unit::rocket_ship},
    {"balloon_carrier", Unit::balloon_carrier},
    {"tender", Unit::tender},
};

const UnitMeta UNITS_META[] = {
    {Unit::hoplite, 56, 18, 0, NO_AMMO, 1, 1, true},
    {Unit::steam_giant, 184, 42, 0, NO_AMMO, 3, 3, false},
    {Unit::spearman, 13, 4, 0, NO_AMMO, 0, 1, true},
    {Unit::swordsman, 18, 10, 0, NO_AMMO, 0, 1, true},
    {Unit::slinger, 8, 2, 3, 5, 0, 1, true},
    {Unit::archer, 16, 5, 5, 3, 0, 1, true},
    {Unit::carbineer, 12, 3, 29, 3, 0, 4, true},
    {Unit::ram, 88, 12, 80, 0, NO_AMMO, 5, false},
    {Unit::catapult, 54, 4, 133, 5, 0, 5, false},
    {Unit::mortar, 32, 10, 270, 3, 0, 5, false},
    {Unit::gyrocopter, 29, 0, 17, 4, 0, 1, false},
    {Unit::bombardier, 40, 0, 48, 2, 0, 2, false},
    {Unit::cook, 0, 0, 0, 0, 0, 0, true},
    {Unit::doctor, 0, 0, 0, 0, 0, 0, true},
    {Unit::barbarian, 12, 7, 0, NO_AMMO, 1, 1, true},
};

bool is_ranged(Unit type) {
    return UNITS_META[type].ammo != NO_AMMO;
}