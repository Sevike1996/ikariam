#pragma once

#include <any>
#include <map>
#include <string>
#include <mysql/mysql.h>

#include "sql/statement_base.hpp"

namespace sql
{
typedef std::map<std::string, std::any> Row;

class Result
{
private:
    using ulong = unsigned long;
    using uint = unsigned int;
public:
    Result() = delete;
    Result(__StatementBase statement);

    std::size_t row_count();
    Row operator[](int index);

private:
    static bool is_known_length_field(enum_field_types type);

    void prepare_column(uint column, MYSQL_BIND& binder, std::any& value);
    void fetch_column(uint column, MYSQL_BIND& binder, std::any& value);

    void prepare_string(MYSQL_BIND& binder, std::any& value);
    void prepare_long(MYSQL_BIND& binder, std::any& value);
    void prepare_long_long(MYSQL_BIND& binder, std::any& value);

    __StatementBase _statement;
    std::shared_ptr<MYSQL_RES> _result;
    MYSQL_FIELD* _columns;
    uint _column_count;
    std::size_t _row_count;
};
}