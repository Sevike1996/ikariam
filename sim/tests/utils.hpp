#include <iostream>

#include "slot.hpp"
#include "formation.hpp"
#include "slot_iterator.hpp"

Formation dummy_formation(Formation::Type formationType);

std::ostream& operator<<(std::ostream& os, const Slot& slot);

std::ostream& operator<<(std::ostream& os, const Formation& formation);