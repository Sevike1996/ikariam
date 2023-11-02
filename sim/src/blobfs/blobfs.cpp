#include "blobfs/blobfs.hpp"

#include "blobfs/uuid.hpp"

#include <iostream>

namespace fs = std::filesystem;

bool create_directory(fs::path dir_path)
{
    if (!fs::is_directory(dir_path) || !fs::exists(dir_path)) {
        return fs::create_directories(dir_path);
    }
    return true;
}

fs::path BlobFS::get_document_path(const std::string& uid) const
{
    return _base / fs::path(uid.substr(0, 2)) / fs::path(uid.substr(2));
}

BlobFS::BlobFS(fs::path base)
{
    _base = base;
    ::create_directory(_base);
}

std::string BlobFS::put(const std::string& data)
{
    auto uid = uuid::generate_uid();  // TODO make sure the uid doesn't already exists
    auto document = open(uid, std::ios::out);
    if (!document) {
        throw std::runtime_error("Failed to open blob file");
    }

    **document << data;
    return uid;
}

std::string BlobFS::get(const std::string& uid) const
{
    std::stringstream buffer;
    auto document = open(uid, std::ios::in);
    if (!document) {
        throw std::runtime_error("Failed to open blob file");
    }

    buffer << (*document)->rdbuf();
    return buffer.str();
}

std::optional<std::unique_ptr<std::fstream>> BlobFS::open(const std::string& uid, std::ios::openmode mode) const
{
    auto document_path = get_document_path(uid);

    if (!::create_directory(document_path.parent_path())) {
        return {};
    }

    auto document = std::make_unique<std::fstream>(document_path, mode);
    if (!document->is_open()) {
        return {};
    }

    return document;
}

void BlobFS::remove(const std::string& uid)
{
    fs::remove(get_document_path(uid));
}
