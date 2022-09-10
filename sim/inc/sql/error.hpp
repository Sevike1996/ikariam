#pragma once

#include <stdexcept>
#include <string>

namespace sql {

class error : std::exception {
public:
    error(std::string msg);

    const char * what () const throw ();

private:
    std::string _msg;
};

} // namespace sql