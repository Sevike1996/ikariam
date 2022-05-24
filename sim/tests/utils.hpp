#include <iostream>

#include "slot.hpp"
#include "formation.hpp"
#include "slot_iterator.hpp"

std::ostream& operator<<(std::ostream& os, const Slot& slot);

std::ostream& operator<<(std::ostream& os, const Formation& formation);

class FormationSlotIterator : public SlotIterator {
public:
    FormationSlotIterator(Formation& formation);
    
    Slot* operator->() override;

    void advance() override;
    bool is_done() override;
private:
    Formation& _formation;
    int _hit_slot_index;
};


template<typename MatrixT>
void clash_formation(Formation& attacking, Formation& defending)
{
    MatrixT matrix(attacking);
    FormationSlotIterator slot_chain(defending);
    clash_matrix(matrix, slot_chain);
}