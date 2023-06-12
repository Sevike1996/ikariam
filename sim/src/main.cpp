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
        auto formation = battlefield.get_formation((Formation::Type)type);
        serialized[Formation::FORMATION_NAMES[type]] = formation.to_json();
    }

    serialized["_ammo"] = army->get_ammo_json();
    serialized["ammo"] = army->get_ammo_percentage();
    serialized["reserve"] = army->get_reserves();
    auto round_info = json::array();
    round_info.push_back(json::array({username, battlefield.get_units_count() + army->get_units_count(), battlefield.get_losses_count()}));
    serialized["info"] = round_info;

    return serialized;
}

Formation parse_formation(json obj)
{
    return Formation(Formation::front, 0, 0);
}

std::optional<Formation::Type> from_string(std::string s)
{
    for (int i = 0; i < Formation::FORMATION_NAMES.size(); i++)
    {
        if (Formation::FORMATION_NAMES[i] == s) {
            return static_cast<Formation::Type>(i);
        }
    }
    return {};
}

void fill_formation(Formation& formation ,json formation_json, std::shared_ptr<Army> army)
{
    for (auto slot : formation_json) {
        int count = slot[1].get<int>();
        if (count == 0) {
            continue;
        }
        Unit type = static_cast<Unit>(slot[0].get<int>());
        int first_health = slot[4].get<int>();
        auto& ammo_pool = army->get_ammo_pool(type);

        formation.fill_slot(army->load_stats(type), count, first_health, ammo_pool);
        army->reinforce_used(type, count, 0);
    }
}

void load_ammo(std::shared_ptr<Army> army, json ammo)
{
    for (auto& [unit_type, ammo_count] : ammo.items()) {
        int i = 0;
        std::istringstream(unit_type) >> i;
        army->add_ammo(static_cast<Unit>(i), ammo_count.get<int>());
    }
}

void load_reserves(std::shared_ptr<Army> army, json reserves)
{
    for (auto& reserve_pair : reserves) {
        // int i = 0;
        // std::istringstream(unit_type) >> i;
        // army->add_ammo(static_cast<Unit>(i), bar.get<int>());
        auto unit_type = static_cast<Unit>(reserve_pair[0].get<int>());
        int count = reserve_pair[1].get<int>();
        army->reinforce(unit_type, count, 0);
    }
}

std::shared_ptr<BattleField> parse_round_side(json side, BattleField::BattleFieldSize battlefieldSize, std::shared_ptr<Army> army)
{
    auto battlefield = std::make_shared<BattleField>(battlefieldSize);
    for (auto& [key, value] : side.items()) {
        auto formation_type = from_string(key);
        if (formation_type.has_value()) {
            fill_formation(battlefield->get_formation(formation_type.value()), value, army);
        } else if (key == "_ammo") {
            load_ammo(army, value);
        } else if (key == "reserve") {
            load_reserves(army, value);
        } else {
            continue;
        }
    }
    return battlefield;
}

void update_mission_in_battle(Database& db, const Mission& mission, std::string_view round_raw)
{
    auto top_army = std::make_shared<Army>(std::make_unique<StatLoader>(db, mission.from));
    auto bottom_army = std::make_shared<Army>(std::make_unique<StatLoader>(db, mission.to));

    auto size = BattleField::get_size(db.get_town_hall_level(mission.to));
    json prev_round = json::parse(round_raw);
    auto top = parse_round_side(prev_round["attacker"], size, top_army);
    top->fill(top_army);
    auto bottom = parse_round_side(prev_round["defender"], size, bottom_army);
    bottom->fill(bottom_army);

    clash(*top, *bottom);

    json round = json::object();
    round["attacker"] = to_json(*top, db.getTownsUsername(mission.from), top_army);
    round["defender"] = to_json(*bottom, db.getTownsUsername(mission.to), bottom_army);
    round["date"] = datetime::to_string(mission.next_stage_time);
    round["background"] = 2;  // TODO decide this better
    std::cout << round.dump() << std::endl;

    db.store_round(mission, round.dump());
}

void load_attacking_units(std::shared_ptr<Army> army, Database& db, const Mission& mission)
{
    auto units = db.load_attacking_units(mission);
    for (auto& [type, count] : units) {
        army->reinforce(type, count);
    }
}

void load_defending_units(std::shared_ptr<Army> army, Database& db, const Mission& mission)
{
    auto units = db.load_defending_units(mission);
    for (auto& [type, count] : units) {
        army->reinforce(type, count);
    }

    auto wall_level = db.get_wall_level(mission.to);
    if (wall_level != 0) {
        auto size = BattleField::get_size(db.get_town_hall_level(mission.to));
        int wall_count = BattleField::BATTLE_FIELD_SIZES[size][Formation::Type::front].amount;
        army->reinforce(Unit::wall, wall_count);   
    }
}

void update_mission_arrived(Database& db, const Mission m)
{
    // TODO receive db in this, will be needed when unit upgrade are a feature
    auto top_army = std::make_shared<Army>(std::make_unique<StatLoader>(db, m.from));
    auto bottom_army = std::make_shared<Army>(std::make_unique<StatLoader>(db, m.to));
    load_attacking_units(top_army, db, m);
    load_defending_units(bottom_army, db, m);
    
    auto size = BattleField::get_size(db.get_town_hall_level(m.to));
    BattleField top(size);
    top.fill(top_army);
    BattleField bottom(size);
    bottom.fill(bottom_army);

    clash(top, bottom);

    json round = json::object();
    round["attacker"] = to_json(top, db.getTownsUsername(m.from), top_army);
    round["defender"] = to_json(bottom, db.getTownsUsername(m.to), bottom_army);
    round["date"] = datetime::to_string(m.next_stage_time);
    round["background"] = 2;  // TODO decide this better
    std::cout << round.dump() << std::endl;

    db.store_round(m, round.dump());

    // TODO load stored armies

    // TODO while (!winner and !next_time > current_time)
}

void update_mission(Database& db, const Mission& m)
{
    auto round = db.get_last_round(m);
    if (round.has_value()) {
        update_mission_in_battle(db, m, round.value());
    } else {
        update_mission_arrived(db, m);
    }
}

__attribute__((weak)) int main()
{
    try {
        Database db;

        auto missions = db.get_missions_needing_update(Mission::State::EN_ROUTE);
        for (auto mission : missions) {
            auto size = BattleField::get_size(db.get_town_hall_level(mission.to));
            db.update_arrived(mission, size);
        }

        // TODO remove old rounds from db

        missions = db.get_missions_needing_update(Mission::State::IN_BATTLE);
        for (auto mission : missions) {
            update_mission(db, mission);
        }
    } catch (sql::error& e) {
        std::cerr << e.what() << std::endl;
    }
    return 0;
}
