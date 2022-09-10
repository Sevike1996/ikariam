#pragma once

#include <string>
#include <memory>

#include <mysql/mysql.h>

namespace sql
{

class __ConnectionBase {
public:
    __ConnectionBase();
    void connect(std::string sock, std::string db_name);

    std::shared_ptr<MYSQL_STMT> alloc_statement();

    const char* get_error();

private:
    std::shared_ptr<MYSQL> _conn;
};

} // namespace sql