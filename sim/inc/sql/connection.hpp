#pragma once

#include <string>
#include <memory>

#include <mysql/mysql.h>

#include "sql/statement.hpp"
#include "sql/connection_base.hpp"

namespace sql
{

class Connection : public __ConnectionBase {
public:
    Result query(std::string query);
    Statement create_statement();
};

} // namespace sql