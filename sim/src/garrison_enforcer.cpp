#include "garrison_enforcer.hpp"

GarrisonEnforcer::GarrisonEnforcer(Army& army, int garrison_limit) : _army(army)
{
    if (_army.get_units_count() > garrison_limit) {
        _borrowed = _army.borrow_squad(Unit::wall, 10000);
    }
}

GarrisonEnforcer::~GarrisonEnforcer()
{
    if (_borrowed.has_value()) {
        _army.return_squad(Unit::wall, _borrowed->count, _borrowed->stats->health);
    }
}

