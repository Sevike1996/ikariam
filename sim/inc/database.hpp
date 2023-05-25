#pragma once

#include <ctime>
#include <list>
#include <optional>

#include "army.hpp"
#include "mission.hpp"
#include "battlefield.hpp"
#include "blobfs/blobfs.hpp"
#include "sql/connection.hpp"

class Database
{
public:
    Database();

    Army load_defensive_army(const Mission& mission);
    Army load_attacking_army(const Mission& mission);

    std::string getTownsUsername(int town_id);

    BattleField::BattleFieldSize getBattlefieldSize(const Mission& mission);

    std::list<Mission> get_missions_needing_update(Mission::State state);

    Mission load_mission(int mission_id);

    void store_round(const Mission& mission, const std::string& round);

    void update_arrived(const Mission& mission);

private:
    void _create_battle(const Mission& mission);

    sql::Connection _conn;
    BlobFS _blobs;
};
