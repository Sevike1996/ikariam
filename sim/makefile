LIBS := mysqlclient

SRC_DIR := src
INC_DIR := inc
OBJ_DIR := obj
DEP_DIR := dep
BIN_DIR := bin

SRCS := $(wildcard $(SRC_DIR)/*.cpp)
OBJS := $(patsubst $(SRC_DIR)/%,$(OBJ_DIR)/%.o,$(basename $(SRCS)))
DEPS := $(patsubst $(SRC_DIR)/%,$(DEP_DIR)/%.d,$(basename $(SRCS)))

CXXFLAGS := -Wall -Werror -std=c++17 -g
CPPFLAGS := -I$(INC_DIR) $(shell pkg-config $(LIBS) --cflags-only-I)
DEPFLAGS = -MM -MP
LDLIBS := $(shell pkg-config $(LIBS) --libs)

COMPILE.cpp = $(CXX) -c $(CPPFLAGS) $(CXXFLAGS) -o $@ $<
LINK.o = $(CXX) $(LDFLAGS) $^ $(LOADLIBES) $(LDLIBS) -o $@

.PHONY: clean

.PRECIOUS: $(DEPS)

$(BIN_DIR)/simulator: $(OBJS) | $(BIN_DIR)
	$(LINK.o)

clean:
	$(RM) $(OBJS) $(DEPS) simulator


$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp | $(OBJ_DIR)
	$(COMPILE.cpp)

$(DEP_DIR)/%.d: $(SRC_DIR)/%.cpp | $(DEP_DIR)
	$(CXX) $(CPPFLAGS) $(DEPFLAGS) -MF $@ -MT '$(OBJ_DIR)/$(basename $(<F)).o' $<

include $(DEPS)

$(OBJ_DIR) $(DEP_DIR) $(BIN_DIR):
	@mkdir -p $@