#pragma once

#include <optional>
#include <ctime>
#include <chrono>

using namespace std::chrono;

struct Mission {
    enum State {
        LOADING,
        EN_ROUTE,
        IN_BATTLE,
        RETURNING,
        DISPERSED,
        FINISHED,
    };

    enum Type {
        TRANSPORT,
        STATION,
        STATION_FLEET,
        DEFEND,
        DEFEND_PORT,
        PLUNDER,
        PLUNDER_BARBARIANS,
        OCCUPY_TOWN,
        OCCUPY_PORT,
    };

    int id;
    int from;
    int to;
    State state;
    Type type;
    std::time_t next_stage_time;

    static constexpr int STAGE_INTERVAL = duration_cast<seconds>(15min).count();


};
