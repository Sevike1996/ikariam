#include <iostream>

#include "slot.hpp"
#include "formation.hpp"
#include "slot_iterator.hpp"

#define DUMMY_MORALE (100)

std::ostream& operator<<(std::ostream& os, const Slot& slot);

std::ostream& operator<<(std::ostream& os, const Formation& formation);