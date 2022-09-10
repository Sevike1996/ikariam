#include "sql/result.hpp"

#include <memory>

#include "sql/error.hpp"

using namespace sql;

Result::Result(__StatementBase statement) :
    _statement(statement)
{
    _result = _statement.result_metadata();
    _columns = mysql_fetch_fields(_result.get());
    _column_count = mysql_num_fields(_result.get());
    
    _statement.store_result();
    _row_count = _statement.row_count();
}

std::size_t Result::row_count()
{
    return _row_count;
}

Row Result::operator[](int index)
{
    Row row;
    std::shared_ptr<ulong[]> lengths(new ulong[_column_count]());
    std::shared_ptr<MYSQL_BIND[]> binders(new MYSQL_BIND[_column_count]());

    for (std::size_t i = 0; i < _column_count; i++) {
        binders[i].buffer = nullptr;
        binders[i].buffer_length = 0;
        binders[i].length= lengths.get() + i;
        binders[i].buffer_type = _columns[i].type;
    }

    
    for (int i = 0; i < _column_count; i++) {
        if (is_known_length_field(_columns[i].type)) {
            prepare_column(i, binders[i], row[_columns[i].name]);
        }
    }

    _statement.bind_result(binders.get());
    _statement.fetch();

    for (int i = 0; i < _column_count; i++) {
        if (!is_known_length_field(_columns[i].type)) {
            fetch_column(i, binders[i], row[_columns[i].name]);
        }
    }
    
    return row;
}

void Result::prepare_column(uint column, MYSQL_BIND& binder, std::any& value)
{
    switch (binder.buffer_type) {
    case MYSQL_TYPE_LONG:
        prepare_long(binder, value);
        break;
    case MYSQL_TYPE_LONGLONG:
        prepare_long_long(binder, value);
        break;
    default:
        throw error("Unknown field type: " + std::to_string(binder.buffer_type));
    }
}

void Result::fetch_column(uint column, MYSQL_BIND& binder, std::any& value)
{
    switch (binder.buffer_type) {
    case MYSQL_TYPE_VARCHAR:
    case MYSQL_TYPE_VAR_STRING:
    case MYSQL_TYPE_JSON:
        prepare_string(binder, value);
        break;
    default:
        throw error("Unknown field type: " + std::to_string(binder.buffer_type));
    }
    
    _statement.fetch_column(binder, column);
}

void Result::prepare_string(MYSQL_BIND& binder, std::any& value)
{
    value = std::make_any<std::string>();
    ulong length = *(binder.length);

    std::string* s = std::any_cast<std::string>(&value);
    s->resize(length);
    binder.buffer = s->data();
    binder.buffer_length = s->size();
}

void Result::prepare_long(MYSQL_BIND& binder, std::any& value)
{
    value = std::make_any<int>();

    binder.buffer = std::any_cast<int>(&value);
}

void Result::prepare_long_long(MYSQL_BIND& binder, std::any& value)
{
    value = std::make_any<long long>();

    binder.buffer = std::any_cast<long long>(&value);
}

bool Result::is_known_length_field(enum_field_types type)
{
    switch (type)
    {
    case MYSQL_TYPE_LONG:
    case MYSQL_TYPE_LONGLONG:
        return true;
    case MYSQL_TYPE_VARCHAR:
    case MYSQL_TYPE_VAR_STRING:
    case MYSQL_TYPE_JSON:
        return false;
    default:
        throw error("unknown field type" + std::to_string(type));
    }
}
