#include "sql/connection_base.hpp"
#include "sql/error.hpp"

using namespace sql;

__ConnectionBase::__ConnectionBase()
{
    MYSQL* conn = mysql_init(NULL);
    if (conn == nullptr)
    {
        throw error("sql initialization failed");
    }
    _conn.reset(conn, mysql_close);
}

void __ConnectionBase::connect(std::string socket, std::string db_name)
{
    if (mysql_real_connect(_conn.get(), "localhost", "root", "",
                           db_name.c_str(), 3306, socket.c_str(), 0) == NULL)
    {
        throw error(std::string("connection failed") + get_error());
    }
}

const char* __ConnectionBase::get_error()
{
    return mysql_error(_conn.get());
}

std::shared_ptr<MYSQL_STMT> __ConnectionBase::alloc_statement()
{
    MYSQL_STMT* statement = mysql_stmt_init(_conn.get());
    if (statement == NULL)
    {
        throw error("statement initialization failed");
    }
    return std::shared_ptr<MYSQL_STMT>(statement, mysql_stmt_close);
}
