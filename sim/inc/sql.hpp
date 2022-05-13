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
    Error(const char* msg);

    const char * what () const throw ();

private:
    const char* _msg;
};

class Result;

class Row : public std::map<std::string, std::any> {
public:
    Row(Result& result, MYSQL_ROW row);
};

class Result {
public:
    Result(MYSQL_RES* result);

    Row operator[](int index);

    const MYSQL_FIELD& getColumnMeta(int index) const;

    int getColumnCount() const;

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