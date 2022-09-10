#include "sql/error.hpp"

namespace sql
{

error::error(std::string msg) : _msg(msg)
{
}

const char * error::what() const throw ()
{
    return _msg.c_str();
}

}