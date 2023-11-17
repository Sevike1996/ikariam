#pragma once

struct CityInfo
{
    int battlefield_size;
    int garrison_limit;
};

CityInfo get_city_info(int town_hall_level);
