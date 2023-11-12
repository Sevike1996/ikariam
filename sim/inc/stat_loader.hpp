#pragma once

#include <array>
#include <memory>

#include "database.hpp"
#include "unit.hpp"

struct ArmyImprovements
{
    int wall_level;

    // Not yet supported in the server
    struct UnitIprovments
    {
        int damage_bonus;
        int armor_bonus;
    };
    std::array<UnitIprovments, Unit::type_count> improvments;
};

class StatLoader
{
public:
    static std::unique_ptr<ArmyImprovements> load_stats(Database &db,
        int town_id);
};
