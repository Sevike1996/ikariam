#include "battlefield.hpp"

const BattleField::SlotInfo BattleField::BATTLE_FIELD_SIZES[][Formation::Type::type_count] = {
    {{1, 10}, {1, 10}, {1, 30}, {3, 30}, {3, 30}, {0, 0}},
    {{1, 20}, {1, 20}, {2, 30}, {5, 30}, {5, 30}, {2, 30}},
    {{1, 30}, {1, 30}, {3, 30}, {7, 30}, {7, 30}, {4, 30}},
    {{2, 20}, {2, 20}, {4, 30}, {7, 40}, {7, 40}, {6, 30}},
    {{2, 30}, {2, 30}, {5, 30}, {7, 50}, {7, 50}, {6, 40}},
};

BattleField::BattleField(Army army, BattleFieldSize size, std::string username, int morale): 
    _army(army), _size(size), _username(username), _morale(morale), _reduced_morale(morale)
{
    for (int type = 0; type < Formation::type_count; type++) {
        auto formation = create_formation(static_cast<Formation::Type>(type));
        _formations.push_back(std::move(formation));
    }
}

Formation BattleField::create_formation(Formation::Type type)
{
    const SlotInfo& slot_info = BATTLE_FIELD_SIZES[_size][type];
    Formation formation(type);

    for (auto unit_type : formation.getAcceptableUnits()) {
        fill_formation(formation, slot_info, unit_type);
    }

    return formation;
}

void BattleField::fill_formation(Formation& formation, const SlotInfo& slot_info, Unit type)
{
    auto [slot_count, slot_size] = slot_info;
    while (formation.getSlots().size() < slot_count) {
        int slot_allowance = _army.get_squad(type, slot_size);
        if (slot_allowance == 0 ) {
            return;
        }
        const UnitMeta* meta = &UNITS_META[type];
        int& ammo_pool = _army.get_ammo_pool(type);

        formation.fill_slot(meta, slot_allowance, meta->health, ammo_pool);
    }
}

int BattleField::get_units_count() const
{
    int count = 0;
    for (const auto& formation : _formations) {
        count += formation.get_units_count();
    }
    count += _army.get_units_count();
    return count;
}

int BattleField::get_losses_count() const
{
    int count = 0;
    for (const auto& formation : _formations) {
        count += formation.get_losses_count();
    }
    return count;
}

BattleField::json BattleField::to_json() const
{
    json serialized = json::object();

    for (int type = 0; type < Formation::type_count; type++) {
        serialized[Formation::FORMATION_NAMES[type]] = _formations[type].to_json();
    }
    serialized["ammo"] = _army.get_ammo_json();
    serialized["reserve"] = _army.get_units_json();
    serialized["info"] = {json::array({_username, get_units_count(), get_losses_count(), _morale, _morale - _reduced_morale}), };

    return serialized;
}