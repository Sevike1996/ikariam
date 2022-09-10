#pragma once

#include <list>
#include <ctime>

#include "sql/connection.hpp"
#include "army.hpp"
#include "battlefield.hpp"

struct Mission {
    enum State {
        DEPARTING,
        CLASHING,
        LOADING,
        RETURNING,
        DISPERSED,
    };
    int id;
    int from;
    int to;
    State state;
    std::time_t next_stage_time;
};

class Database {
public:
    Database();

    Army load_defensive_army(const Mission& mission);
    Army load_attacking_army(const Mission& mission);

    std::string getTownsUsername(int town_id);

    BattleField::BattleFieldSize getBattlefieldSize(const Mission& mission);

    std::list<int> getMissionsNeedingUpdate();

    Mission load_mission(int mission_id);

    void store_round(const Mission& mission, const std::string& round);

private:
    sql::Connection _conn;
};
