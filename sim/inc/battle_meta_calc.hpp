#pragma once

#include <memory>

#include "battle_meta.hpp"

class BattleMetaCalc
{
public:
    virtual ~BattleMetaCalc() = default;
    virtual BattleMeta calc_battle_meta(const BuildingLevels& levels) = 0;
};

class LandBattleMetaCalc : public BattleMetaCalc
{
public:
    virtual ~LandBattleMetaCalc() = default;
    virtual BattleMeta calc_battle_meta(const BuildingLevels& levels) override;
};

class NavalBattleMetaCalc : public BattleMetaCalc
{
public:
    virtual ~NavalBattleMetaCalc() = default;
    virtual BattleMeta calc_battle_meta(const BuildingLevels& levels) override;
};

std::unique_ptr<BattleMetaCalc> create_battle_meta_calc(BattleType battle_type);
