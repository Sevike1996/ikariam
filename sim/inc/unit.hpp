#pragma once

#include <map>

#define NO_AMMO (-1)

enum Unit
{
    hoplite,
    steam_giant,
    spearman,
    swordsman,
    slinger,
    archer,
    carbineer,
    ram,
    catapult,
    mortar,
    gyrocopter,
    bombardier,
    cook,
    doctor,
    barbarian,
    ram_ship,
    fire_ship,
    paddle_speedboat,
    ballista_ship,
    catapult_ship,
    mortar_ship,
    diving_boat,
    steam_ram,
    rocket_ship,
    balloon_carrier,
    tender,
    wall,
    type_count,
};

struct UnitMeta {
    Unit type;
    int health;
    int attack;
    int ranged_attack;
    int ammo;
    int armor;
    int size;
    bool isHuman;
};

extern const std::map<std::string, Unit> UNIT_TYPES;

extern const UnitMeta UNITS_META[];

UnitMeta get_wall_meta(int level);

bool is_ranged(Unit type);