#pragma once

#include "sql.hpp"
#include "army.hpp"

class Database {
public:
    Database();

    Army load_city_army(int city_id);
    Army load_mission_army(int mission_id);

private:
    sql::Connection _conn;
};
