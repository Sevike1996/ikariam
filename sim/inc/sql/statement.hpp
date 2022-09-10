#pragma once

#include <string>
#include <tuple>
#include <memory>

#include <mysql/mysql.h>

#include "sql/result.hpp"
#include "sql/statement_base.hpp"
#include "sql/connection_base.hpp"

namespace sql
{

void bind_one(MYSQL_BIND* binders, std::size_t index, const std::string& element);
void bind_one(MYSQL_BIND* binders, std::size_t index, const int& element);

template<std::size_t i = 0, typename CurrentT, typename... Elements>
void bind_helper(MYSQL_BIND* binders, const CurrentT&& current, const Elements&&... elements)
{
    bind_one(binders, i, current);
    if constexpr (sizeof...(Elements) > 0) {
        bind_helper<i + 1>(binders, std::forward<const Elements>(elements)...);
    }
}

class Statement : public __StatementBase
{
public:
    Statement(__ConnectionBase& conn);

    template<typename... Elements>
    void execute(std::string statement, const Elements... elements)
    {
        constexpr std::size_t ARG_COUNT = std::tuple_size<std::tuple<Elements...>>::value;
        MYSQL_BIND binders[ARG_COUNT] = {{0}};

        bind_helper(binders, std::forward<const Elements>(elements)...);

        _execute(statement, binders);
    }

    template<>
    void execute<>(std::string statement)
    {
        _execute(statement, nullptr);
    }

    Result result();

private:
    void _execute(const std::string& statement, MYSQL_BIND* binders);
};

} //namespace sql