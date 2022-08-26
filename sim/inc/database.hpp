#pragma once

#include "sql.hpp"
#include "army.hpp"
#include "battlefield.hpp"

struct Mission {
    int id;
    int from;
    int to;
    int state;
    int next_stage_time;
};

class Database {
public:
    Database();

    Army load_defensive_army(const Mission& mission);
    Army load_attacking_army(const Mission& mission);

    BattleField::BattleFieldSize getBattlefieldSize(const Mission& mission);

    Mission load_mission(int mission_id);

private:
    sql::Connection _conn;
};
