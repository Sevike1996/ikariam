#pragma once

#include <ctime>
#include <list>
#include <optional>

#include "unit.hpp"
#include "mission.hpp"
#include "blobfs/blobfs.hpp"
#include "sql/connection.hpp"

class Database
{
public:
    Database();

    std::list<std::tuple<Unit, int>> load_defending_units(const Mission& mission);
    std::list<std::tuple<Unit, int>> load_attacking_units(const Mission& mission);

    std::string getTownsUsername(int town_id);

    int get_town_hall_level(int town_id);

    std::list<Mission> get_missions_needing_update(Mission::State state);

    Mission load_mission(int mission_id);

    void store_round(const Mission& mission, const std::string& round);

    void update_arrived(const Mission& mission, int battlefield_size);

    std::optional<std::string> get_last_round(const Mission& mission);

    int get_wall_level(int town_id);

private:
    void _create_battle(const Mission& mission, int battlefield_size);

    sql::Connection _conn;
    BlobFS _blobs;
};
