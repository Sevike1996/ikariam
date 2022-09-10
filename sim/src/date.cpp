#include "date.hpp"

#include <iomanip>
#include <sstream>

std::string datetime::to_string(std::time_t timestamp)
{
    auto tm = *std::localtime(&timestamp);
    std::stringstream stream;
    stream << std::put_time(&tm, "%F (%T)");
    return stream.str();
}