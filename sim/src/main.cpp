#include <mysql/mysql.h>
#include <stdio.h>
#include <map>
#include <string>
#include <iostream>

#include "sql.hpp"
#include "unit.hpp"

#include "formation.hpp"

class Army
{
public:
    Army();
    void reinforce(Unit unitType, int count, int health);
    std::map<Unit, int, int> units;
    int ammo_pools[Unit::type_count];
};

__attribute__((weak)) int main() {
    // sql::Connection conn;

    // sql::Result res = conn.query("SELECT * FROM alpha_users");

    // auto row = res[0];

    // for (auto [name, value] : row) {
    //     std::cout << name << " " << value << std::endl;
    // }

    // std::cout << attack << std::endl << defense << std::endl;
    
    return 0;
}