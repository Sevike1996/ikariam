#include <mysql/mysql.h>
#include <stdio.h>
#include <iostream>
#include <map>
#include <string>

#include "database.hpp"
#include "date.hpp"
#include "battlefield.hpp"
#include "clash.hpp"
#include "sql/error.hpp"

#include <nlohmann/json.hpp>

using json = nlohmann::json;

json to_json(const BattleField& battlefield, std::string username, const std::shared_ptr<Army> army)
{
    json serialized = json::object();

    for (auto type = 0; type < Formation::type_count; type++) {
        serialized[Formation::FORMATION_NAMES[type]] = battlefield.get_formation((Formation::Type)type).to_json();
    }
    serialized["ammo"] = army->get_ammo_json() ;
    serialized["reserve"] = army->get_units_json();
    auto round_info = json::array();
    round_info.push_back(json::array({username, battlefield.get_units_count() + army->get_units_count(), battlefield.get_losses_count()}));
    serialized["info"] = round_info;

    return serialized;
}

void update_mission(Database& db, const Mission& m)
{
    auto a = db.load_attacking_army(m);
    auto b = db.load_defensive_army(m);
    
    auto size = db.getBattlefieldSize(m);
    BattleField top(size);
    top.fill(a);
    BattleField bottom(size);
    bottom.fill(b);

    clash(top, bottom);

    json round = json::object();
    round["attacker"] = to_json(top, db.getTownsUsername(m.from), a);
    round["defender"] = to_json(bottom, db.getTownsUsername(m.to), b);
    round["date"] = datetime::to_string(m.next_stage_time);
    round["background"] = 2;  // TODO decide this better
    std::cout << round.dump() << std::endl;

    db.store_round(m, round.dump());

    // TODO load stored armies

    // TODO while (!winner and !next_time > current_time)
    // TODO store armies
}

__attribute__((weak)) int main()
{
    try {
        Database db;

        std::cout << "En route" << std::endl;
        auto missions = db.get_missions_needing_update(Mission::State::EN_ROUTE);
        for (auto mission : missions) {
            std::cout << mission.id << std::endl;
            db.update_arrived(mission);
        }

        // TODO remove old rounds from db

        std::cout << "In battle" << std::endl;
        missions = db.get_missions_needing_update(Mission::State::IN_BATTLE);
        for (auto mission : missions) {
            std::cout << mission.id << std::endl;
            update_mission(db, mission);
        }
    } catch (sql::error& e) {
        std::cerr << e.what() << std::endl;
    }
    return 0;
}
