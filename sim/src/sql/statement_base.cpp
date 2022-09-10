#include "sql/statement_base.hpp"
#include "sql/error.hpp"

#include <mysql/mysql.h>

using namespace sql;

__StatementBase::__StatementBase(std::shared_ptr<MYSQL_STMT> statement) : _statement(statement)
{
}

std::shared_ptr<MYSQL_RES> __StatementBase::result_metadata()
{
    MYSQL_RES* result = mysql_stmt_result_metadata(_statement.get());
    if (result == nullptr) {
        throw error("statement result fetch failed");
    }
    return std::shared_ptr<MYSQL_RES>(result, mysql_free_result);
}

void __StatementBase::store_result()
{
    int retval = mysql_stmt_store_result(_statement.get());
    if (retval != 0) {
        throw error("statement result storing failed");
    }
}

std::size_t __StatementBase::row_count()
{
    return mysql_stmt_num_rows(_statement.get());
}

void __StatementBase::bind_result(MYSQL_BIND* binders)
{
    int retval = mysql_stmt_bind_result(_statement.get(), binders);
    if (retval != 0) {
        throw std::runtime_error("statement result binding failed");
    }
}

void __StatementBase::bind_param(MYSQL_BIND* binders)
{
    int retval = mysql_stmt_bind_param(_statement.get(), binders);
    if (retval != 0) {
        throw error("statement bind failed");
    }
}

void __StatementBase::prepare(const std::string& statement)
{
    int retval = mysql_stmt_prepare(_statement.get(), statement.data(), statement.size());
    if (retval != 0) {
        throw error("statement prepare failed");
    }
}

void __StatementBase::execute()
{
    int retval = mysql_stmt_execute(_statement.get());
    if (retval != 0) {
        throw error("statement execution failed");
    }
}

void __StatementBase::fetch()
{
    int retval = mysql_stmt_fetch(_statement.get());
    if (retval == 1) {
        throw error("statement fetching failed");
    }
}

void __StatementBase::fetch_column(MYSQL_BIND& binder, uint column, std::size_t offset)
{
    int retval = mysql_stmt_fetch_column(_statement.get(), &binder, column, offset);
    if(retval != 0) {
        throw error("statement column fetching failed");
    }
}
