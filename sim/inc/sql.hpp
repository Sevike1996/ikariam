#pragma once

#include <string>
#include <tuple>
#include <map>
#include <any>
#include <stdexcept>
#include <mysql/mysql.h>


namespace sql {

class Error : std::exception {
public:
    Error(std::string msg);

    const char * what () const throw ();

private:
    std::string _msg;
};

class Result;

class Row : public std::map<std::string, std::any> {
public:
    Row(Result& result, MYSQL_ROW row);
};

class Result {
public:
    struct Iterator;

    Result(MYSQL_RES* result);

    Row operator[](int index);

    const MYSQL_FIELD& getColumnMeta(int index) const;

    int getColumnCount() const;
    int getRowCount() const;

    Iterator begin();

    Iterator end();

    struct Iterator {
    public:
        Iterator(Result& result, std::size_t index);

        Row operator*();
        bool operator!=(Iterator& other) const;
        bool operator==(Iterator& other) const;
        Iterator& operator++();
    
    private:
        Result& _result;
        std::size_t _index;
    };


private:
    MYSQL_RES* _result;
    MYSQL_FIELD* _columns;
    int _columnCount;
};

class Connection {
public:
    Connection(std::string sock, std::string db_name);

    Result query(std::string query);
private:
    MYSQL* _conn;
};

}