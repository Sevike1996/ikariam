#pragma once

#include <ctime>
#include <list>
#include <optional>

#include "army.hpp"
#include "battlefield.hpp"
#include "sql/connection.hpp"

struct Mission {
    enum State {
        DEPARTING,
        CLASHING,
        LOADING,
        RETURNING,
        DISPERSED,
    };
    enum Type {
        TRANSPORT,
        STATION,
        STATION_FLEET,
        DEFEND,
        DEFEND_PORT,
        PLUNDER,
        OCCUPY_TOWN,
        OCCUPY_PORT,
        CAPTURING_PORT,
    };
    int id;
    int from;
    int to;
    State state;
    Type type;
    std::time_t next_stage_time;
    std::optional<int> battle_id;
};

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
