#include <iostream>
#include <map>
#include <mysql/mysql.h>
#include <string>

#include "battle_meta_calc.hpp"
#include "battlefield.hpp"
#include "clash.hpp"
#include "database.hpp"
#include "date.hpp"
#include "sql/error.hpp"

#include <nlohmann/json.hpp>

using json = nlohmann::json;

template<typename T>
json map_to_json(T&& mapping)
{
    json converted = json::object();
    for (auto [key, value] : mapping) {
        if constexpr (std::is_enum_v<typename T::key_type>) {
            converted[std::to_string(static_cast<int>(key))] = value;
        } else {
            converted[std::to_string(key)] = value;
        }
    }
    return converted;
}

void to_json(nlohmann::json& serialized, const Slot& slot)
{
    int health_percentage = (static_cast<float>(slot.first_health) / slot.meta->health) * 100;

    serialized = nlohmann::json({
        static_cast<int>(slot.meta->type),
        slot.count,
        slot.orig_count - slot.count,
        health_percentage / 100.0,
        slot.first_health,
    });
}

void to_json(nlohmann::json& serialized, const Formation& formation)
{
    if (formation.is_empty()) {
        serialized = json::array();
        return;
    }
    for (const auto& slot : formation.get_slots()) {
        serialized.push_back(json(slot));
    }
}

json to_ui_json(const BattleField& battlefield, std::string username, const Army& army)
{
    json serialized = json::object();

    for (auto type = 0; type < Formation::type_count; type++) {
        auto formation = battlefield.get_formation((Formation::Type)type);
        serialized[Formation::FORMATION_NAMES[type]] = json(formation);
    }

    serialized["ammo"] = map_to_json(army.get_ammo_percentage());
    serialized["reserve"] = map_to_json(army.get_reserves());
    auto round_info = json::array();
    round_info.push_back(json::array(
        {username, battlefield.get_units_count() + army.get_units_count(), battlefield.get_losses_count()}));
    serialized["info"] = round_info;

    return serialized;
}

json to_data_json(BattleField& battlefield, std::string username, Army& army)
{
    json serialized = json::object();

    std::map<Unit, std::list<int>> first_healths = army.get_first_healths();
    std::map<std::string, std::list<int>> converted_healths;
    for (auto&& [key, value] : first_healths) {
        converted_healths[std::to_string(static_cast<int>(key))] = value;
    }

    serialized["healths"] = std::move(converted_healths);
    serialized["units"] = map_to_json(army.get_reserves());
    serialized["ammo"] = map_to_json(army.get_ammo());

    return serialized;
}

void load_ammo(json ammo, Army& army)
{
    for (const auto& [unit, ammo_count] : ammo.items()) {
        army.add_ammo(static_cast<Unit>(std::stoi(unit)), ammo_count);
    }
}

void load_healths(json healths, Army& army)
{
    for (const auto& [unit, health] : healths.items()) {
        army.set_first_health(static_cast<Unit>(std::stoi(unit)), std::move(health));
    }
}

void load_units(json units, Army& army)
{
    for (const auto& [unit, health] : units.items()) {
        army.reinforce_no_ammo(static_cast<Unit>(std::stoi(unit)), std::move(health));
    }
}

void parse_round_side(json side, Army& army)
{
    for (auto& [key, value] : side.items()) {
        if (key == "ammo") {
            load_ammo(value, army);
        } else if (key == "healths") {
            load_healths(value, army);
        } else if (key == "units") {
            load_units(value, army);
        }
    }
}

void run_round(Database& db, const Mission& mission, const BuildingLevels& levels, Army& attacking_army, Army& defending_army)
{
    auto battle_meta = create_battle_meta_calc(BattleType::LAND)->calc_battle_meta(levels);

    BattleField attacking(battle_meta);
    attacking.fill(attacking_army);
    BattleField defending(battle_meta);
    defending.fill(defending_army);

    clash(attacking, defending);

    json ui_round = json::object();
    ui_round["attacker"] = to_ui_json(attacking, db.getTownsUsername(mission.from), attacking_army);
    ui_round["defender"] = to_ui_json(defending, db.getTownsUsername(mission.to), defending_army);
    ui_round["date"] = datetime::to_string(mission.next_stage_time);
    ui_round["background"] = 2; // TODO decide this better
    std::cout << ui_round.dump() << std::endl;
    db.store_round_ui(mission, ui_round.dump());

    attacking.drain_into(attacking_army);
    defending.drain_into(defending_army);

    json data_round = json::object();
    data_round["attacker"] = to_data_json(attacking, db.getTownsUsername(mission.from), attacking_army);
    data_round["defender"] = to_data_json(defending, db.getTownsUsername(mission.to), defending_army);
    data_round["date"] = datetime::to_string(mission.next_stage_time);
    std::cout << data_round.dump() << std::endl;
    db.store_round_data(mission, data_round.dump());
}

void load_attacking_units(Army& army, Database& db, const Mission& mission)
{
    auto units = db.load_attacking_units(mission);
    for (auto& [type, count] : units) {
        army.reinforce(type, count);
    }
}

void load_defending_units(Army& army, Database& db, const Mission& mission)
{
    auto units = db.load_defending_units(mission);
    for (auto& [type, count] : units) {
        army.reinforce(type, count);
    }

    BuildingLevels levels = db.get_buildings(mission.to);
    if (levels.wall != 0 && (mission.type == Mission::Type::PLUNDER || mission.type == Mission::Type::OCCUPY_TOWN)) {
        auto battle_meta = LandBattleMetaCalc().calc_battle_meta(levels);
        int wall_count = battle_meta.formations_size[Formation::Type::front].amount;
        army.reinforce(Unit::wall, wall_count);
    }
}

enum BattleBackgrounds
{
    OPEN_LAND, // more soliders then garrisson limit
    SEA,
    CITY_GATE, // less soliders then garrison limnit, even after walls have collapsed.
    BARBARIANS,
    REBELLION,
};

int get_background(Mission::Type mission_type, bool inside_garrison)
{
    switch (mission_type) {
    case Mission::Type::OCCUPY_PORT:
    case Mission::Type::DEFEND_PORT:
        return BattleBackgrounds::SEA;
    case Mission::Type::PLUNDER:
    case Mission::Type::OCCUPY_TOWN:
        return inside_garrison ? BattleBackgrounds::CITY_GATE : BattleBackgrounds::OPEN_LAND;
    case Mission::Type::PLUNDER_BARBARIANS:
        return BattleBackgrounds::BARBARIANS;
    case Mission::Type::DEFEND:
        return BattleBackgrounds::REBELLION;
    default:
        return OPEN_LAND;
    }
}

void update_mission_arrived(Database& db, const Mission& mission)
{
    BuildingLevels levels = db.get_buildings(mission.to);
    Army top_army(db.get_army_improvements(db.get_town_player_id(mission.from)));
    Army bottom_army(db.get_army_improvements(db.get_town_player_id(mission.to)), levels.wall);

    load_attacking_units(top_army, db, mission);
    load_defending_units(bottom_army, db, mission);

    run_round(db, mission, levels, top_army, bottom_army);

    // TODO while (!winner and !next_time > current_time)
}

void update_mission_in_battle(Database& db, const Mission& mission, std::string_view round_raw)
{
    BuildingLevels levels = db.get_buildings(mission.to);
    Army top_army(db.get_army_improvements(db.get_town_player_id(mission.from)));
    Army bottom_army(db.get_army_improvements(db.get_town_player_id(mission.to)), levels.wall);

    json prev_round = json::parse(round_raw);
    parse_round_side(prev_round["attacker"], top_army);
    parse_round_side(prev_round["defender"], bottom_army);

    run_round(db, mission, levels, top_army, bottom_army);
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
            // Apparently the battlefield can change size mid-battle, and this is too much for a single commit
            // TODO fix this and javascript
            db.update_arrived(mission, BattleField::BattleFieldSize::mini);
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
