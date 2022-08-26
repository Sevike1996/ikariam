#include "battlefield.hpp"

#define MORALE_MAX (100)
#define ROUND_MORALE_REDUCTION (10)
#define MORE_LOSSES_MOREALE_REDUCTION (5)

const BattleField::SlotInfo BattleField::BATTLE_FIELD_SIZES[][Formation::Type::type_count] = {
    {{1, 10}, {1, 10}, {1, 30}, {3, 30}, {3, 30}, {0, 0}},
    {{1, 20}, {1, 20}, {2, 30}, {5, 30}, {5, 30}, {2, 30}},
    {{1, 30}, {1, 30}, {3, 30}, {7, 30}, {7, 30}, {4, 30}},
    {{2, 20}, {2, 20}, {4, 30}, {7, 40}, {7, 40}, {6, 30}},
    {{2, 30}, {2, 30}, {5, 30}, {7, 50}, {7, 50}, {6, 40}},
};

BattleField::BattleField(Army& army, BattleFieldSize size, std::string username, int morale): 
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
    while (formation.size() < slot_count) {
        auto [slot_allowance, meta] = _army.get_squad(type, slot_size);
        if (slot_allowance == 0 ) {
            return;
        }
        int& ammo_pool = _army.get_ammo_pool(type);

        formation.fill_slot(meta, slot_allowance, meta->health, ammo_pool);
    }
}

bool BattleField::can_defend() const
{
    Formation::Type DEFENDING_FROMATION_TYPES[] = {Formation::front, Formation::flank, Formation::long_range};
    for (auto type : DEFENDING_FROMATION_TYPES) {
        if (!_formations[type].is_empty()) {
            return true;
        }
        if (has_spare(type)) {
            return true;
        }
    }

    return false;
}

bool BattleField::has_spare(Formation::Type type) const
{
    for (auto unit_type : Formation::ACCEPTABLE_UNITS[type]) {
        if (_army.get_unit_count(unit_type) != 0) {
            return true;
        }
    }
    return false;
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

int BattleField::get_morale() const
{
    return _morale;
}

void BattleField::reduce_morale(bool lost_more)
{
    int cooks = _army.get_unit_count(Unit::cook);
    _morale -= ROUND_MORALE_REDUCTION;
    if (lost_more) {
        _morale -= MORE_LOSSES_MOREALE_REDUCTION;
    }
    _morale += cooks;
    _morale = std::min(_morale, MORALE_MAX);
}

Formation& BattleField::get_formation(Formation::Type type)
{
    return _formations[type];
}

BattleField::json BattleField::to_json() const
{
    json serialized = json::object();

    for (int type = 0; type < Formation::type_count; type++) {
        serialized[Formation::FORMATION_NAMES[type]] = _formations[type].to_json();
    }
    serialized["ammo"] = _army.get_ammo_json();
    serialized["reserve"] = _army.get_units_json();
    serialized["info"] = {json::array({_username, get_units_count(), get_losses_count(), _morale, _reduced_morale - _morale}), };

    return serialized;
}