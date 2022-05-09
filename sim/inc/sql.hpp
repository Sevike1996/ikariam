#pragma once

#include <string>
#include <tuple>
#include <stdexcept>
#include <mysql/mysql.h>

namespace sql {

class Error : std::exception {
public:
    Error(const char* msg);

    const char * what () const throw ();

private:
    const char* _msg;
};

class Result;

struct Row {
public:
    struct Iterator;

    Row(Result& result, MYSQL_ROW row);

    const char* operator[](int index);

    bool operator==(Row& other) const;

    Iterator begin();

    Iterator end();

    struct Iterator {
    public:
        Iterator(Result& result, Row& row);
        Iterator(Result& result, Row& row, std::size_t index);

        std::tuple<std::string, std::string> operator*();
        bool operator!=(Iterator& other) const;
        bool operator==(Iterator& other) const;
        Iterator& operator++();
    
    private:
        Result& _result;
        Row& _row;
        std::size_t _index;
    };

private:
    Result& _result;
    MYSQL_ROW _row;
};

class Result {
public:
    Result(MYSQL_RES* result);

    Row operator[](int index);

    const char* getColumnName(int index) const;

    int getColumnCount() const;

private:
    MYSQL_RES* _result;
    MYSQL_FIELD* _columns;
    int _columnCount;
};

class Connection {
public:
    Connection();

    Result query(std::string query);
private:
    MYSQL* _conn;
};

}