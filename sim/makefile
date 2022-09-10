LIBS := mysqlclient nlohmann_json
CXX := clang++

SRC_DIR := src
INC_DIR := inc
OBJ_DIR := obj
DEP_DIR := dep
BIN_DIR := bin
TEST_DIR := tests

SRCS := $(wildcard $(SRC_DIR)/*.cpp) $(wildcard $(SRC_DIR)/*/*.cpp)
OBJS := $(patsubst $(SRC_DIR)/%,$(OBJ_DIR)/%.o,$(basename $(SRCS)))
DEPS := $(patsubst $(SRC_DIR)/%,$(DEP_DIR)/%.d,$(basename $(SRCS)))

SRC_DIRS := $(sort $(dir $(SRCS)))
OBJ_DIRS := $(patsubst $(SRC_DIR)/%,$(OBJ_DIR)/%,$(SRC_DIRS))
DEP_DIRS := $(patsubst $(SRC_DIR)/%,$(DEP_DIR)/%,$(SRC_DIRS))

TEST_SRCS := $(wildcard $(TEST_DIR)/*.cpp)
TEST_OBJS := $(patsubst $(TEST_DIR)/%,$(OBJ_DIR)/%.o,$(basename $(TEST_SRCS)))
TEST_DEPS := $(patsubst $(TEST_DIR)/%,$(DEP_DIR)/%.d,$(basename $(TEST_SRCS)))

CXXFLAGS := -Wall -Werror -std=c++17 -g
CPPFLAGS := -I$(INC_DIR) $(shell pkg-config $(LIBS) --cflags-only-I)
DEPFLAGS = -MM -MP
LDLIBS := $(shell pkg-config $(LIBS) --libs)

COMPILE.cpp = $(CXX) -c $(CPPFLAGS) $(CXXFLAGS) -o $@ $<
LINK.o = $(CXX) $(LDFLAGS) $^ $(LOADLIBES) $(LDLIBS) -o $@

vpath %.cpp $(SRC_DIR) $(TEST_DIR) $(SRC_DIR)/*

.PHONY: clean check

.PRECIOUS: $(DEPS)

$(BIN_DIR)/simulator: $(OBJS) | $(BIN_DIR)
	$(LINK.o)

$(BIN_DIR)/tests: LDLIBS += $(shell pkg-config gtest --libs)
$(BIN_DIR)/tests: CPPFLAGS += -Itests
$(BIN_DIR)/tests: $(TEST_OBJS) $(OBJS) | $(BIN_DIR)
	$(LINK.o)

check: $(BIN_DIR)/tests
	$<

clean:
	$(RM) $(OBJS) $(DEPS) $(wildcard $(BIN_DIR)/*)

$(OBJ_DIR)/%.o: %.cpp | $(OBJ_DIRS)
	$(COMPILE.cpp)

$(DEP_DIR)/%.d: $(SRC_DIR)/%.cpp | $(DEP_DIRS)
	$(CXX) $(CPPFLAGS) $(DEPFLAGS) -MF $@ -MT '$(OBJ_DIR)/$(basename $(<F)).o' $<

include $(DEPS)

$(OBJ_DIRS) $(DEP_DIRS) $(BIN_DIR) :
	@mkdir -p $@