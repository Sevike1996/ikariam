#include <array>

#include "formation.hpp"
#include "army.hpp"

class BattleField
{
public:
    BattleField(Army& army);
    Formation& getFormation(Formation::Type formationType);

private:
    std::array<Formation, Formation::Type::type_count> _formations;
    Army& _army;
};
