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
    
    struct SlotInfo
    {
        std::size_t amount;
        int size;
    };


    BattleField(std::shared_ptr<Army> army, BattleFieldSize size, std::string username);

    bool can_defend() const;
    int get_units_count() const;
    int get_losses_count() const;

    Formation& get_formation(Formation::Type type);

    json to_json() const;

    static const SlotInfo BATTLE_FIELD_SIZES[][Formation::Type::type_count];

private:

    Formation create_formation(Formation::Type type);
    void fill_formation(Formation& formation, const SlotInfo& slot_info, Unit type);
    bool has_spare(Formation::Type type) const;

    std::vector<Formation> _formations;
    std::shared_ptr<Army> _army;
    BattleFieldSize _size;
    std::string _username;
};
