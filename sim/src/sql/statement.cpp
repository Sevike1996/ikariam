#include "sql/statement.hpp"
#include "sql/error.hpp"

using namespace sql;

Statement::Statement(__ConnectionBase& conn) : __StatementBase(conn.alloc_statement())
{
    
}


void sql::bind_one(MYSQL_BIND* binder, std::size_t index, const std::string& element)
{
    binder[index].buffer = const_cast<char*>(element.c_str());
    binder[index].buffer_type = MYSQL_TYPE_VARCHAR;
    binder[index].buffer_length = element.size();
}

void sql::bind_one(MYSQL_BIND* binder, std::size_t index, const int& element)
{
    binder[index].buffer = const_cast<int*>(&element);
    binder[index].buffer_type = MYSQL_TYPE_LONG;
    binder[index].buffer_length = sizeof(element);
}


void Statement::_execute(const std::string& statement, MYSQL_BIND* binders)
{
    prepare(statement);
    if (binders != nullptr) {
        bind_param(binders);
    }
    __StatementBase::execute();
}

Result Statement::result()
{
    return Result(*this);
}