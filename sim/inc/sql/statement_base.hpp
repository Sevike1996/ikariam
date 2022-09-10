#pragma once

#include <memory>
#include <mysql/mysql.h>

namespace sql
{

class __StatementBase {
public:
    __StatementBase() = delete;
    __StatementBase(std::shared_ptr<MYSQL_STMT> statement);

    void prepare(const std::string& statement);
    void execute();
    void fetch();
    void fetch_column(MYSQL_BIND& binder, uint column, std::size_t offset = 0);

    std::shared_ptr<MYSQL_RES> result_metadata();
    std::size_t row_count();
    void store_result();

    void bind_result(MYSQL_BIND* binders);
    void bind_param(MYSQL_BIND* binders);

private:
    std::shared_ptr<MYSQL_STMT> _statement;
};

} // namespace sql