#pragma once

#include <exception>
#include <filesystem>
#include <fstream>
#include <memory>
#include <optional>
#include <string>

class BlobFS
{
public:
    BlobFS(std::filesystem::path base);

    std::string put(const std::string& data);
    std::string get(const std::string& uid) const;
    void remove(const std::string& uid);

private:
    std::filesystem::path get_document_path(const std::string& uid) const;
    std::optional<std::unique_ptr<std::fstream>> open(const std::string& uid, std::ios::openmode mode) const;

    std::filesystem::path _base;
};
