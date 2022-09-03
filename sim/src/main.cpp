#include <mysql/mysql.h>
#include <stdio.h>
#include <map>
#include <string>
#include <iostream>

#include "database.hpp"

// #include <nlohmann/json.hpp>

// using json = nlohmann::json;

// void fetch_json() {
//     sql::Connection conn("/tmp/mysqld/mysqld.sock", "ik_game");
//     sql::Result res = conn.query("SELECT * FROM foo;");
//     auto row = res[0];
//     std::cout << "id=" << std::any_cast<int>(row["id"]) << std::endl;
//     auto data = std::any_cast<json>(row["data"]);
//     std::cout << "data=" << data << std::endl;
//     std::cout << "data[key1]=" << data["key1"].get<std::string>() << std::endl;
// }

// void store_json() {
//     sql::Connection conn("/tmp/mysqld/mysqld.sock", "ik_game");
//     std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
//     json j(m);
//     std::stringstream s;
//     s << "INSERT INTO foo(data) VALUES('" << j << "');";
//     conn.query(s.str());
// }

#include <sstream>

#include "battlefield.hpp"
#include "clash.hpp"

#if 0
void old() {
    try {
        // Database db;
        // auto army = db.load_city_army(2);
        // std::cout << army.get_units_json() << std::endl; 
        // auto army = db.load_city_army(2);
        // std::cout << army.get_units_json() << std::endl; 
        Army army;
        army.reinforce(Unit::spearman, 100);
        // army.reinforce(Unit::spearman, 5);
        // army.reinforce(Unit::slinger, 100);

        // TODO create bottom, create top, if bottom.hasWalls() top.withdrawFlanks();

        Army army2;
        army2.reinforce(Unit::spearman, 5);
        army2.reinforce(Unit::mortar, 7);
        // army2.reinforce(Unit::ram, 5); // TODO displayed as carabineer in reserve
        // army2.reinforce(Unit::hoplite, 30);


        BattleField top(army, BattleField::small, "foo", 100);
        BattleField bottom(army2, BattleField::small, "bar", 100);
        clash(top, bottom);

        json round2 = json::object();
        round2["attacker"] = top.to_json();
        round2["defender"] = bottom.to_json();
        round2["date"] = "(12.01.2017 7:28:13)";
        round2["background"] = 2;

        json j = json::object();
        j["town"] = "MyTownName",
        j["upgrades"] = json::object(),
        j["battlefield"] = BattleField::small,
        j["rounds"] = {round2, };
        std::cout << j << std::endl;
    } catch (sql::Error& e) {
        std::cerr << e.what() << std::endl;
    }
}
#elif 1

__attribute__((weak)) int main() {
    try {
        Database db;

        Mission m = db.load_mission(1);
        auto a = db.load_attacking_army(m);
        auto d = db.load_defensive_army(m);
        std::cout << d.get_units_json() << std::endl; 

    } catch (sql::Error& e) {
        std::cerr << e.what() << std::endl;
    }
    return 0;
}
#endif