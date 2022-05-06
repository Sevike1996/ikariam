const UNITS = {
  1: "Hoplite",
  2: "Steam Giant",
  3: "Spearmen",
  4: "Swordsman",
  5: "Slinger",
  6: "Archer",
  7: "Sulfur Carabineers",
  8: "Battering Ram",
  9: "Catapult",
  10: "Mortar",
  11: "Gyrocopter",
  12: "Balloon-Bombardier",
  13: "Cook",
  14: "Doctor",
  15: "Barbarian-Axe Swinger",
  16: "Ram Ship",
  17: "Fire Ship",
  18: "Paddle Speedboat",
  19: "Ballista Ship",
  20: "Catapult Ship",
  21: "Mortar Ship",
  22: "Diving Boat",
  23: "Merchant Ship",
  24: "Steam Ram",
  25: "Rocket Ship",
  26: "Balloon Carrier",
  27: "Tender",
  28: "Wall",
};

const SIDES = { 1: "attacker", 2: "defender" };
const ATTACKER = 1;
const DEFENDER = 2;

const BATTLE_FIELDS = [
  {
    front: 3,
    flank: 0,
    range: 3,
    artillery: 1,
    bomber: 1,
    air: 1,
  },
  {
    front: 5,
    flank: 2,
    range: 5,
    artillery: 2,
    bomber: 1,
    air: 1,
  },
  {
    front: 7,
    flank: 4,
    range: 7,
    artillery: 3,
    bomber: 1,
    air: 1,
  },
  {
    front: 7,
    flank: 6,
    range: 7,
    artillery: 4,
    bomber: 2,
    air: 2,
  },
  {
    front: 7,
    flank: 6,
    range: 7,
    artillery: 5,
    bomber: 2,
    air: 2,
  },
];

var roundIndex = 1;
var battle = null;
var battleField = null;

function getUnitClassName(unitType) {
  return "s3" + String(unitType).padStart(2, "0");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Layout {
  static LAYOUTS = {
    front: [21, false],
    flank: [22, false],
    range: [23, true],
    artillery: [24, true],
    bomber: [25, true],
    air: [26, true],
  };

  constructor(playerSide, layoutName) {
    [this.displayNumber, this.hasAmmo] = Layout.LAYOUTS[layoutName];
    this.slotCount = battleField.getLayoutSizes()[layoutName];
    this.playerSide = playerSide;
  }

  update(layoutData) {
    let slot = null;
    let slotData = null;

    for (let i = 0; i < this.slotCount; i++) {
      slot = this.getSlot(i);

      slotData = layoutData[i];

      if (slotData != null) {
        slot.setData(slotData);
      } else {
        slot.setEmpty();
      }
    }
  }

  getSlot(slotNumber) {
    let id = `slot${this.playerSide}_${this.displayNumber}_${slotNumber}`;
    let slotElement = document.getElementById(id);
    if (this.hasAmmo) {
      return new RangedSlot(slotElement);
    } else {
      return new Slot(slotElement);
    }
  }

  *getSlots() {
    for (let i = 0; i < this.slotCount; i++) {
      yield this.getSlot(i);
    }
  }
}
class BattleField {
  constructor(battleFieldNumber) {
    this.battleFieldNumber = battleFieldNumber;
  }

  getLayout(playerSide, layoutName) {
    return new Layout(playerSide, layoutName);
  }

  getLayoutSizes() {
    return BATTLE_FIELDS[this.battleFieldNumber];
  }
}
class Slot {
  static BAR_HEIGHT_PX = 32;
  static HEALTH_ELEM_INDEX = 0;
  static HEALTH_LOSS_ELEM_INDEX = 1;

  constructor(element) {
    this.element = element;
  }

  setEmpty() {
    for (let child of this.element.children) {
      child.style.visibility = "hidden";
    }
    this.clearClassList();
    this.element.classList.add("slot", "empty");
  }

  setData(slotData) {
    let [unitType, count, loss, healthPercent] = slotData;

    this.clearClassList();
    let unitClassName = getUnitClassName(unitType);
    this.element.classList.add("slot", "army_small", "normal", unitClassName);

    this.setBarPairVisibility(Slot.HEALTH_ELEM_INDEX, "visible");
    this.updateBar(Slot.HEALTH_LOSS_ELEM_INDEX, healthPercent);

    this.setText(`${count} (-${loss})`);
  }

  setText(text) {
    let textElementIndex = this.element.children.length - 1;
    let textElement = this.element.children[textElementIndex];

    this.setElementVisibility(textElementIndex, "visible");
    textElement.innerHTML = text;
  }

  updateBar(elemIndex, percentage) {
    let bar = this.element.children[elemIndex];
    bar.style.height = (1 - percentage) * Slot.BAR_HEIGHT_PX + "px";
  }

  setBarPairVisibility(firstBarIndex, visibility) {
    this.setElementVisibility(firstBarIndex, visibility);
    this.setElementVisibility(firstBarIndex + 1, visibility);
  }

  setElementVisibility(elementIndex, visibility) {
    let element = this.element.children[elementIndex];
    element.style.visibility = visibility;
  }

  clearClassList() {
    let classes = [];
    this.element.classList.forEach((className) => classes.push(className));
    classes.forEach((className) => this.element.classList.remove(className));
  }
}

class RangedSlot extends Slot {
  static AMMO_DATA_INDEX = 4;
  static AMMO_ELEM_INDEX = 2;
  static AMMO_LOSS_ELEM_INDEX = 3;

  setData(slotData) {
    super.setData(slotData);

    let ammoPercent = slotData[RangedSlot.AMMO_DATA_INDEX];
    // Even in Ranged slots, there can be units without ammunition (such as ram in artillery)
    if (ammoPercent == null) {
      this.setAmmo(ammoPercent);
    } else {
      this.setBarPairVisibility(RangedSlot.AMMO_ELEM_INDEX, "hidden");
    }
  }

  setEmpty() {
    super.setEmpty();

    this.setBarPairVisibility(RangedSlot.AMMO_ELEM_INDEX, "hidden");
  }

  setAmmo(percentage) {
    this.setBarPairVisibility(RangedSlot.AMMO_ELEM_INDEX, "visible");
    this.updateBar(RangedSlot.AMMO_LOSS_ELEM_INDEX, percentage);
  }
}

function updateReserve(playerSide, reserve) {
  let sideName = SIDES[playerSide];
  let playerPages = document.getElementById(
    "res" + capitalize(sideName) + "Pages"
  );
  playerPages.innerHTML = "";
  let page = null;

  for (let [i, [unitType, unitCount]] of Object.entries(reserve)) {
    if (i % 9 == 0) {
      page = document.createElement("ul");
      playerPages.appendChild(page);
    }

    let unit = createReserveElement(unitType, unitCount);

    page.appendChild(unit);
  }
}

function createReserveElement(unitType, unitCount) {
  let container = document.createElement("li");
  let image = document.createElement("div");

  image.classList.add("army_small", "normal", getUnitClassName(unitType));
  container.appendChild(image);
  container.innerHTML += unitCount;

  return container;
}

function updatePlayer(battleSide, playerData) {
  for (const layoutName of Object.keys(Layout.LAYOUTS)) {
    let layoutData = playerData[layoutName] ?? [];
    let layout = battleField.getLayout(battleSide, layoutName);
    layout.update(layoutData);
  }
  updateReserve(battleSide, playerData.reserve);
}

function hideNavButtons(buttonNames) {
  for (const buttonName of buttonNames) {
    let button = document.getElementById("nav" + buttonName);
    button.hidden = true;
  }
}

function updateRoundNavButtons() {
  if (roundIndex == 1) {
    hideNavButtons(["First", "Back"]);
  }
  if (roundIndex == battle.rounds.length) {
    hideNavButtons(["Fore", "Last"]);
  }
}

function setTitle(date) {
  title = document.getElementById("battleTitle");
  title.innerHTML = `<span class="headline_big bold">Battle for WhatsForDinner Round<br>1 / 64</span><br>${date}`;
}

function showRound() {
  let round = battle.rounds[roundIndex - 1];
  let [attacker, defender, date] = round;

  updatePlayer(ATTACKER, attacker);
  updatePlayer(DEFENDER, defender);

  setTitle(date);

  updateRoundNavButtons();
}

function handleBattleData(battleData) {
  battle = battleData;
  battleField = new BattleField(battle["battlefield"]);
  showRound();
}

window.addEventListener("DOMContentLoaded", (event) => {
  fetch("fight.json")
    .then((response) => response.json())
    .then(handleBattleData);
});

function fist() {
  roundIndex = 1;
  showRound();
}

function backward() {
  roundIndex -= 1;
  showRound();
}

function forward() {
  roundIndex += 1;
  showRound();
}

function last() {
  roundIndex = battle.rounds.length;
  showRound();
}
