#include "nlohmann/json.hpp"

#include "sql/connection.hpp"
#include "sql/error.hpp"

using json = nlohmann::json;

using namespace sql;

Result Connection::query(std::string query)
{
    Statement statement(*this);
    return statement.execute(query);
}

Statement Connection::create_statement()
{
    return Statement(*this);
}