#pragma once

#include <array>

#include "formation.hpp"
#include "army.hpp"

class BattleField
{
using json = nlohmann::json;
public:
    enum BattleFieldSize {
        mini,
        small,
        medium,
        large,
        big,
    };

    BattleField(Army army, BattleFieldSize size, std::string username, int morale);

    int get_unit_count() const;
    int get_loss_count() const;

    json to_json() const;

private:
    struct SlotInfo
    {
        std::size_t amount;
        int size;
    };

    static const SlotInfo BATTLE_FIELD_SIZES[][Formation::Type::type_count];

    Formation create_formation(Formation::Type type);
    void fill_formation(Formation& formation, const SlotInfo& slot_info, Unit type);

    std::vector<Formation> _formations;
    Army _army;
    BattleFieldSize _size;
    std::string _username;
    int _morale;
    int _reduced_morale;
};
