#include <random>
#include <sstream>

namespace uuid
{
static std::random_device rd;
static std::mt19937 gen(rd());
static std::uniform_int_distribution<> dis(0, 15);
static constexpr int UUID_LEN = 16;

static constexpr char hex(int num)
{
    if (num < 10) {
        return '0' + num;
    } else {
        return 'a' + num - 10;
    }
}

std::string generate_uid()
{
    std::stringstream ss;
    for (int i = 0; i < UUID_LEN; i++) {
        ss << hex(dis(gen));
    }
    return ss.str();
}
}  // namespace uuid
