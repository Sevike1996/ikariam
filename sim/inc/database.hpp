#pragma once

#include <ctime>
#include <list>
#include <optional>

#include "army.hpp"
#include "mission.hpp"
#include "battlefield.hpp"
#include "sql/connection.hpp"

class Database
{
public:
    Database();

    Army load_defensive_army(const Mission& mission);
    Army load_attacking_army(const Mission& mission);

    std::string getTownsUsername(int town_id);

    BattleField::BattleFieldSize getBattlefieldSize(const Mission& mission);

    std::list<int> get_missions_needing_update(Mission::State state);

    Mission load_mission(int mission_id);

    int get_mission_battle(const Mission& mission);

    void store_round(int battle_id, const std::string& round);

    void update_arrived(const Mission& mission);

private:
    void _create_battle(const Mission& mission);

    sql::Connection _conn;
};
