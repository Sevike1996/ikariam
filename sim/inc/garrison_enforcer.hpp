#pragma once

#include <memory>

#include "army.hpp"

class GarrisonEnforcer
{
    GarrisonEnforcer(Army& army, int garrison_limit);
    ~GarrisonEnforcer();
    GarrisonEnforcer(GarrisonEnforcer&& other) = delete;
    GarrisonEnforcer(const GarrisonEnforcer& other) = delete;

private:
    Army& _army;
    std::optional<Army::Squad> _borrowed;
};

