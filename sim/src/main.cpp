#include <mysql/mysql.h>
#include <stdio.h>
#include <iostream>
#include <map>
#include <string>

#include "battlefield.hpp"
#include "clash.hpp"
#include "database.hpp"
#include "date.hpp"
#include "sql/error.hpp"

#include <nlohmann/json.hpp>

using json = nlohmann::json;

json to_ui_json(const BattleField& battlefield, std::string username, const std::shared_ptr<Army> army)
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
    round_info.push_back(json::array(
        {username, battlefield.get_units_count() + army->get_units_count(), battlefield.get_losses_count()}));
    serialized["info"] = round_info;

    return serialized;
}

json to_data_json(BattleField& battlefield, std::string username, std::shared_ptr<Army> army)
{
    json serialized = json::object();
    json healths = json::object();
    std::map<Unit, std::list<int>> front_healths;

    for (auto type = 0; type < Formation::type_count; type++) {
        auto& formation = battlefield.get_formation((Formation::Type)type);
        auto current_healts = formation.get_first_healths();
        for (const auto& unit_health : current_healts) {
            auto [type, health] = unit_health;
            front_healths[type].push_back(health);
        }

        formation.drain_into(army);
    }

    std::map<std::string, std::list<int>> converted_healths;
    for (auto&& [key, value] : front_healths) {
        converted_healths[std::to_string(static_cast<int>(key))] = std::move(value);
    }

    serialized["healths"] = std::move(converted_healths);
    serialized["units"] = army->get_reserves();
    serialized["ammo"] = army->get_ammo_json();

    return serialized;
}

Formation parse_formation(json obj)
{
    return Formation(Formation::front, 0, 0);
}

std::optional<Formation::Type> from_string(std::string s)
{
    for (int i = 0; i < Formation::FORMATION_NAMES.size(); i++) {
        if (Formation::FORMATION_NAMES[i] == s) {
            return static_cast<Formation::Type>(i);
        }
    }
    return {};
}

void load_ammo(json ammo, Army& army) {
    for (const auto& [unit, ammo_count] : ammo.items()) {
        army.add_ammo(static_cast<Unit>(std::stoi(unit)), ammo_count);
    }
}

void load_healths(json healths, Army& army) {
    for (const auto& [unit, health] : healths.items()) {
        army.set_first_health(static_cast<Unit>(std::stoi(unit)), std::move(health));
    }
}

void load_units(json units, Army& army) {
    for (json::iterator it = units.begin(); it != units.end(); ++it) {
        const auto& [unit, count] = it->template get<std::array<int, 2>>();
        army.reinforce_no_ammo(static_cast<Unit>(unit), count);
    }
}

std::shared_ptr<BattleField> parse_round_side(json side,
                                              BattleField::BattleFieldSize battlefieldSize,
                                              std::shared_ptr<Army> army)
{
    auto battlefield = std::make_shared<BattleField>(battlefieldSize);
    for (auto& [key, value] : side.items()) {
        if (key == "ammo") {
            load_ammo(value, *army);
        } else if (key == "healths") {
            load_healths(value, *army);
        } else if (key == "units") {
            load_units(value, *army);
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
    // todo load ammo
    auto top = parse_round_side(prev_round["attacker"], size, top_army);
    top->fill(top_army);
    auto bottom = parse_round_side(prev_round["defender"], size, bottom_army);
    bottom->fill(bottom_army);

    clash(*top, *bottom);

    json ui_round = json::object();
    ui_round["attacker"] = to_ui_json(*top, db.getTownsUsername(mission.from), top_army);
    ui_round["defender"] = to_ui_json(*bottom, db.getTownsUsername(mission.to), bottom_army);
    ui_round["date"] = datetime::to_string(mission.next_stage_time);
    ui_round["background"] = 2;  // TODO decide this better
    std::cout << ui_round.dump() << std::endl;
    db.store_round_ui(mission, ui_round.dump());

    json data_round = json::object();
    data_round["attacker"] = to_data_json(*top, db.getTownsUsername(mission.from), top_army);
    data_round["defender"] = to_data_json(*bottom, db.getTownsUsername(mission.to), bottom_army);
    data_round["date"] = datetime::to_string(mission.next_stage_time);
    std::cout << data_round.dump() << std::endl;
    db.store_round_data(mission, data_round.dump());
}

void load_attacking_units(std::shared_ptr<Army> army, Database& db, const Mission& mission)
{
    auto units = db.load_attacking_units(mission);
    for (auto& [type, count] : units) {
        army->reinforce(type, count);
    }
}

void load_prev_round()
{

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

void update_mission_arrived(Database& db, const Mission mission)
{
    // TODO receive db in this, will be needed when unit upgrade are a feature
    auto top_army = std::make_shared<Army>(std::make_unique<StatLoader>(db, mission.from));
    auto bottom_army = std::make_shared<Army>(std::make_unique<StatLoader>(db, mission.to));
    load_attacking_units(top_army, db, mission);
    load_defending_units(bottom_army, db, mission);

    auto size = BattleField::get_size(db.get_town_hall_level(mission.to));
    BattleField top(size);
    top.fill(top_army);
    BattleField bottom(size);
    bottom.fill(bottom_army);

    clash(top, bottom);

    json ui_round = json::object();
    ui_round["attacker"] = to_ui_json(top, db.getTownsUsername(mission.from), top_army);
    ui_round["defender"] = to_ui_json(bottom, db.getTownsUsername(mission.to), bottom_army);
    ui_round["date"] = datetime::to_string(mission.next_stage_time);
    ui_round["background"] = 2;  // TODO decide this better
    std::cout << ui_round.dump() << std::endl;
    db.store_round_ui(mission, ui_round.dump());

    json data_round = json::object();
    data_round["attacker"] = to_data_json(top, db.getTownsUsername(mission.from), top_army);
    data_round["defender"] = to_data_json(bottom, db.getTownsUsername(mission.to), bottom_army);
    data_round["date"] = datetime::to_string(mission.next_stage_time);
    std::cout << data_round.dump() << std::endl;
    db.store_round_data(mission, data_round.dump());

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
