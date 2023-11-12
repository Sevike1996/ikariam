#include "stat_loader.hpp"

#include <any>

std::unique_ptr<ArmyImprovements> StatLoader::load_stats(Database& db, int town_id)
{
    auto stats = std::make_unique<ArmyImprovements>();
    stats->wall_level = db.get_wall_level(town_id);
    return stats;
}
