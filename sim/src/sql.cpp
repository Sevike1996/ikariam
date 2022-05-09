#include "sql.hpp"

sql::Error::Error(const char* msg) : _msg(msg)
{
    // MYSQL_ROW* r;
    // r->
}

const char * sql::Error::what() const throw ()
{
    return _msg;
}

sql::Connection::Connection()
{
    _conn = mysql_init(NULL);

    if (_conn == NULL)
    {
        throw sql::Error(mysql_error(_conn));
    }

    // TODO export to connect()
    if (mysql_real_connect(_conn, "localhost", "root", "",
                           "ik_game", 3306, "../../MyIkariam/mysql/mysql.sock", 0) == NULL)
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

const char* sql::Result::getColumnName(int index) const
{
    return _columns[index].name;
}

int sql::Result::getColumnCount() const
{
    return _columnCount;
}

sql::Row::Row(Result& result, MYSQL_ROW row) : _result(result), _row(row)
{
}

const char* sql::Row::operator[](int index)
{
    return _row[index];
}

bool sql::Row::operator==(Row& other) const
{
    return _row == other._row;
}

sql::Row::Iterator sql::Row::begin()
{
    return sql::Row::Iterator(_result, *this);
}

sql::Row::Iterator sql::Row::end()
{
    return sql::Row::Iterator(_result, *this, _result.getColumnCount());
}

sql::Row::Iterator::Iterator(sql::Result& result, sql::Row& row) : _result(result), _row(row), _index(0)
{
}

sql::Row::Iterator::Iterator(sql::Result& result, sql::Row& row, std::size_t index) : _result(result), _row(row), _index(index)
{
}

std::tuple<std::string, std::string> sql::Row::Iterator::operator*()
{
    return std::make_pair(_result.getColumnName(_index), _row[_index]);
}

bool sql::Row::Iterator::operator!=(Iterator& other) const
{
    return !(*this == other);
}

bool sql::Row::Iterator::operator==(Iterator& other) const
{
    return _row == other._row && _index == other._index;
}

sql::Row::Iterator& sql::Row::Iterator::operator++()
{
    _index++;
    return *this;
}
