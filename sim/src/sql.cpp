#include "sql.hpp"

static std::any parse_int_field(const char* raw_value);

static std::any parse_field(enum enum_field_types type, const char* raw_value);

sql::Error::Error(const char* msg) : _msg(msg)
{
    // MYSQL_ROW* r;
    // r->
}

const char * sql::Error::what() const throw ()
{
    return _msg;
}

sql::Connection::Connection(std::string socket, std::string db_name)
{
    _conn = mysql_init(NULL);

    if (_conn == NULL)
    {
        throw sql::Error(mysql_error(_conn));
    }

    // TODO export to connect()
    if (mysql_real_connect(_conn, "localhost", "root", "",
                           db_name.c_str(), 3306, socket.c_str(), 0) == NULL)
    {
        mysql_close(_conn);
        throw sql::Error(mysql_error(_conn));
    }
}

sql::Result sql::Connection::query(std::string query)
{
    if (mysql_query(_conn, query.c_str()))
    {
        throw sql::Error(mysql_error(_conn));
    }

    MYSQL_RES *result = mysql_store_result(_conn);

    if (result == NULL)
    {
        throw sql::Error(mysql_error(_conn));
    }

    return sql::Result(result);
}

sql::Result::Result(MYSQL_RES* result) : _result(result)
{
    _columnCount = mysql_num_fields(result);
    _columns = mysql_fetch_fields(result);
}

sql::Row sql::Result::operator[](int index)
{
    mysql_data_seek(_result, index);
    MYSQL_ROW row = mysql_fetch_row(_result);
    if (row == nullptr) {
        throw std::out_of_range("result: range check");
    }
    return sql::Row(*this, row);
}

const MYSQL_FIELD& sql::Result::getColumnMeta(int index) const
{
    return _columns[index];
}

int sql::Result::getColumnCount() const
{
    return _columnCount;
}

int sql::Result::getRowCount() const 
{
    return mysql_num_rows(_result);
}

sql::Result::Iterator sql::Result::begin()
{
    return sql::Result::Iterator(*this, 0);
}

sql::Result::Iterator sql::Result::end()
{
    return sql::Result::Iterator(*this, getRowCount());
}

sql::Result::Iterator::Iterator(Result& result, std::size_t index) : _result(result), _index(index)
{
}

sql::Row sql::Result::Iterator::operator*()
{
    return std::move(_result[_index]);
}

bool sql::Result::Iterator::operator!=(Iterator& other) const
{
   return !(*this == other);
}
 
bool sql::Result::Iterator::operator==(Iterator& other) const
{
    return _index == other._index;
}

sql::Result::Iterator& sql::Result::Iterator::operator++()
{
    _index++;
    return *this;
}


sql::Row::Row(Result& result, MYSQL_ROW row)
{
    for (int i = 0; i < result.getColumnCount(); i++) {
        const auto& column_meta = result.getColumnMeta(i);
        auto value = parse_field(column_meta.type, row[i]);
        auto pair = std::make_pair<std::string, std::any>(column_meta.name, std::move(value));
        this->insert(pair);
    }
}

static std::any parse_field(enum enum_field_types type, const char* raw_value) {
    switch (type) {
    case MYSQL_TYPE_LONG:
        return parse_int_field(raw_value);
    case MYSQL_TYPE_VARCHAR:
        return std::make_any<std::string>(raw_value);
    default:
        throw sql::Error("Unknown field type");
    }
}

#include <iostream>

static std::any parse_int_field(const char* raw_value) {
    if (raw_value == nullptr) {
        return std::make_any<int>(0);
    }
    return std::make_any<int>(std::stoi(raw_value));
}