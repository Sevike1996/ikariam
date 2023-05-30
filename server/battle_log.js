const UPGRADES = {

}

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

function zip(a, b) {
  return a.map((k, i) => [k, b[i]]);
} 

var battle = null;
var battleField = null;

function getUnitClassName(unitType) {
  return "s3" + String(unitType + 1).padStart(2, "0");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function clearClassList(element) {
  let classes = [];
  element.classList.forEach((className) => classes.push(className));
  classes.forEach((className) => element.classList.remove(className));
}

class LayoutMeta {
  constructor(name, num, hasAmmo) {
    this.name = name;
    this.num = num;
    this.hasAmmo = hasAmmo;
  }
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

  static getMetaByNum(num) {
    let found = Object.entries(Layout.LAYOUTS).find(x => x[1][0] == num)
    return new LayoutMeta(found[0], ...found[1]);
  }

  constructor(playerSide, layoutName) {
    [this.displayNumber, this.hasAmmo] = Layout.LAYOUTS[layoutName];
    this.slotCount = battleField.getLayoutSizes()[layoutName];
    this.playerSide = playerSide;
  }

  update(layoutData, playerAmmo) {
    let slot = null;
    let slotData = null;

    for (let i = 0; i < this.slotCount; i++) {
      slot = this.getSlot(i);

      slotData = layoutData[i];

      if (slotData != null) {
        let unitType = slotData[0];
        slotData.push(playerAmmo[unitType]);
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
  constructor(battlefieldSize) {
    this.battlefieldSize = battlefieldSize;
  }

  getLayout(playerSide, layoutName) {
    return new Layout(playerSide, layoutName);
  }

  getLayoutSizes() {
    return BATTLE_FIELDS[this.battlefieldSize];
  }
}

class PlayerInfo {
  constructor(name, units, losses, morale, moraleLoss) {
    this.name = name
    this.units = units;
    this.losses = losses;
    this.morale = morale;
    this.moraleLoss = moraleLoss;
  }

  toHTML() {
    let row = document.createElement("tr");

    row.appendChild(this.createNameElement());
    row.appendChild(this.createMilitaryCount());

    return row;
  }

  createNameElement() {
    let element = document.createElement("td");
    element.classList.add("avatarName");
    element.innerHTML = this.name;
    return element;
  }

  createMilitaryCount() {
    let element = document.createElement("td");
    element.classList.add("militarySize");
    element.innerHTML = `${this.units} (-${this.losses})`;
    return element;
  }

  createMoralBar() {
    let element = document.createElement("td");
    element.classList.add("militaryMorale", "right");

    element.innerHTML = `
    <div id="infoMoraleBar"class="morale_bar">
      <div class="bar" style="background-color: #E25353; width: ${this.morale + this.moraleLoss}%"></div>
      <div class="bar" style="margin-top: -10px; width: ${this.morale}%"></div>
    </div>`

    return element;
  }

  createMoralText() {
    let element = document.createElement("td");
    element.classList.add("morale", "left");
    element.innerHTML = `${this.morale} %`;
    return element;
  }
}
class Slot {
  static ELEMENTS_CLASSES = [["number", "center"], ["hitpoints"], ["loss"]];
  static BAR_HEIGHT_PX = 32;
  static TEXT_ELEM_INDEX = 0;
  static HEALTH_ELEM_INDEX = 1;
  static HEALTH_LOSS_ELEM_INDEX = 2;

  constructor(element) {
    this.element = element;
  }

  populate() {
    for (let classes of Slot.ELEMENTS_CLASSES) {
      let element = document.createElement("div");
      element.classList.add(...classes);
      this.element.appendChild(element);
    }
  }

  setEmpty() {
    for (let child of this.element.children) {
      child.style.visibility = "hidden";
    }
    clearClassList(this.element);
    this.element.classList.add("slot", "empty");
  }

  setData(slotData) {
    let [unitType, count, loss, healthPercent] = slotData;

    clearClassList(this.element);
    let unitClassName = getUnitClassName(unitType);
    this.element.classList.add("slot", "army_small", "normal", unitClassName);

    this.setBarPairVisibility(Slot.HEALTH_ELEM_INDEX, "visible");
    this.updateBar(Slot.HEALTH_LOSS_ELEM_INDEX, healthPercent);

    this.setText(`${count} (-${loss})`);
  }

  setText(text) {
    let textElement = this.element.children[Slot.TEXT_ELEM_INDEX];
    this.setElementVisibility(Slot.TEXT_ELEM_INDEX, "visible");
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
}

class RangedSlot extends Slot {
  static ELEMENTS_CLASSES = [["ammo"], ["ammoLoss"]];
  static AMMO_DATA_INDEX = 5;
  static AMMO_ELEM_INDEX = 3;
  static AMMO_LOSS_ELEM_INDEX = 4;

  populate() {
    super.populate();
    for (let classes of RangedSlot.ELEMENTS_CLASSES) {
      let element = document.createElement("div");
      element.classList.add(...classes);
      this.element.appendChild(element);
    }
  }

  setData(slotData) {
    super.setData(slotData);
    let ammoPercent = slotData[RangedSlot.AMMO_DATA_INDEX];
    // Even in Ranged slots, there can be units without ammunition (such as ram in artillery)
    if (ammoPercent != null) {
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

function updateRoundInfo(battleSide, roundInfo) {
  let sideName = SIDES[battleSide];
  let roundInfoElement = document.getElementById("roundInfo");
  
  let infoTable = document.createElement("table");
  infoTable.classList.add('table01', 'container_morale', 'center', 'border', 'dotted');
  
  let tableBody = document.createElement("tbody");
  tableBody.innerHTML = `
  <tr>
    <th class="${sideName}">${capitalize(sideName)}</th>
    <th>Units</th>
  </tr>`;
  infoTable.appendChild(tableBody);
  
  for (let playerInfo of roundInfo) {
    let player = new PlayerInfo(...playerInfo);
    if (player.units != 0) {
      tableBody.appendChild(player.toHTML());
    }
  }
  
  // Hide if no sides are left
  if (tableBody.childElementCount > 1) {
    roundInfoElement.appendChild(infoTable);
  }
}

function updateBattleSide(battleSide, formationData) {
  for (const layoutName of Object.keys(Layout.LAYOUTS)) {
    let layoutData = formationData[layoutName] ?? [];
    let layout = battleField.getLayout(battleSide, layoutName);
    layout.update(layoutData, formationData.ammo);
  }

  updateRoundInfo(battleSide, formationData.info);
}

function setNavButtonsVisibility(buttonNames, visibility) {
  for (const buttonName of buttonNames) {
    let button = document.getElementById("nav" + buttonName);
    button.style.visibility = visibility;
  }
}

function setPlayerNames(side, info) {
  let names = [];
  info.forEach((playerInfo) => names.push(playerInfo[0]));
  let nameElement = document.getElementById(side + "Name");
  nameElement.innerHTML = `${capitalize(side)}:<br>${names.join(", ")}`
}

function updateBackground(backgroundNumber) {
  let backgroundElement = document.getElementById("battlefield");
  clearClassList(backgroundElement);
  backgroundElement.classList.add(BACKGROUNDS[backgroundNumber]);

}

class ReservedDisplay {
  static RESERVED_UNIT_PER_PAGE = 9;

  constructor(playerSide, display) {
    this.display = display;
    this.playerSide = playerSide;
    this.pageIndex = 0;

    let [prevButton, nextButton] = this.getButtons();
    prevButton.addEventListener('click', (e) => this.prevPage());
    nextButton.addEventListener('click', (e) => this.nextPage());
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.pageIndex += 1;
      this.refresh();
    }
  }

  prevPage() {
    if (this.hasPrevPage()) {
      this.pageIndex -= 1;
      this.refresh();
    }
  }

  hasNextPage() {
    let unitCountRequired = (this.pageIndex + 1) * ReservedDisplay.RESERVED_UNIT_PER_PAGE;
    return this.getReservedUnits().length > unitCountRequired;
  }

  hasPrevPage() {
    return this.pageIndex > 0;
  }

  reset() {
    this.pageIndex = 0;
    this.refresh();
  }

  refresh() {
    this.refreshUnits();
    this.refreshButtons();
  }

  refreshButtons() {
    let buttons = this.getButtons();
    let conditions = [this.hasPrevPage, this.hasNextPage]
    for (let [button, condition] of zip(buttons, conditions)) {
      button.style.visibility = condition.bind(this)() ? 'visible' : 'hidden';
    }
  }

  getDiv() {
    let sideName = SIDES[this.playerSide];
    return document.getElementById("res" + capitalize(sideName));
  }

  getUnitPage() {
    return this.getDiv().lastElementChild.firstElementChild;
  }

  getButtons() {
    let buttonList = this.getDiv().firstElementChild.firstElementChild;
    return [buttonList.firstElementChild, buttonList.lastElementChild]
  }

  refreshUnits() {
    let reserves = this.getPageUnits();
    let page = this.getUnitPage();
    page.innerHTML = "";
  
    for (let [unitType, unitCount] of reserves) {
      let unit = ReservedDisplay.createReserveElement(unitType, unitCount);
      page.appendChild(unit);
    }
  }

  getPageUnits() {
    let sideReserved = this.getReservedUnits();
    let pageMin = this.pageIndex * ReservedDisplay.RESERVED_UNIT_PER_PAGE;
    let pageMax = (this.pageIndex + 1) * ReservedDisplay.RESERVED_UNIT_PER_PAGE;

    return sideReserved.slice(pageMin, pageMax);
  }

  getReservedUnits() {
    let sideName = SIDES[this.playerSide];
    return this.display.getRound()[sideName].reserve;
  }

  static createReserveElement(unitType, unitCount) {
    let container = document.createElement("li");
    let image = document.createElement("div");
  
    image.classList.add("army_small", "normal", getUnitClassName(unitType));
    container.appendChild(image);
    container.innerHTML += unitCount;
  
    return container;
  }
}

class RoundDisplay {
  constructor(battle) {
    this.battle = battle;
    this.rounds = Array(battle.rounds.length);
    this.reservedDisplays = Array.from(Object.keys(SIDES), (side) => new ReservedDisplay(side, this));
    this.roundIndex = 0;
  }

  getRound() {
    return this.rounds[this.roundIndex];
  }

  hasNextRound() {
    return this.roundIndex < this.battle.rounds.length - 1;
  }

  hasPrevRound() {
    return this.roundIndex > 0;
  }

  async showRound() {
    await this.fetchRound();
    let round = this.getRound();
  
    let roundInfoElement = document.getElementById("roundInfo");
    roundInfoElement.innerHTML = ''
  
    updateBattleSide(ATTACKER, round.attacker);
    updateBattleSide(DEFENDER, round.defender);

    for (let reservedDisplay of this.reservedDisplays) {
      reservedDisplay.reset();
    }
  
    this.updateTitle();
   
    setPlayerNames("attacker", round.attacker.info);
    setPlayerNames("defender", round.defender.info);
  
    updateBackground(round.background);
  
    this.updateRoundNavButtons();
  }

  async fetchRound() {
    if (typeof this.rounds[this.roundIndex] !== 'undefined') {
      return;
    }
    let response = await fetch(`/rounds?id=${this.battle.rounds[this.roundIndex]}`)
    this.rounds[this.roundIndex] = await response.json();
  }

  updateTitle() {
    let round = this.getRound();
    let title = document.getElementById("battleTitle");
    title.innerHTML = `<span class="headline_big bold">Battle for ${this.battle.town} Round<br>\
      ${this.roundIndex + 1} / ${this.battle.rounds.length}</span><br>${round.date}`;
  }

  updateRoundNavButtons() {
    setNavButtonsVisibility(["First", "Back", "Fore", "Last"], "hidden");
    if (this.hasPrevRound()) {
      setNavButtonsVisibility(["First", "Back"], "visible");
    }
    if (this.hasNextRound()) {
      setNavButtonsVisibility(["Fore", "Last"], "visible");
    }
  }

  nextRound() {
    if (this.hasNextRound()) {
      this.roundIndex += 1;
      this.showRound();
    }
  }

  lastRound() {
    if (this.hasNextRound()) {
      this.roundIndex = this.battle.rounds.length - 1;
      this.showRound();
    }
  }

  prevRound() {
    if (this.hasPrevRound()) {
      this.roundIndex -= 1;
      this.showRound();
    }
  }

  firstRound() {
    if (this.hasPrevRound()) {
      this.roundIndex = 0;
      this.showRound();
    }
  }
}

var display = null;

function populateField(playerSide) {
  for (key of Object.keys(Layout.LAYOUTS)) {
    let layout = battleField.getLayout(playerSide, key);
    for (let slot of layout.getSlots()) {
      slot.populate();
    }
  }
}

function hideUnusedSlots(battlefieldSize) {
  let currentSize = BATTLE_FIELDS[battlefieldSize];
  let maxSize = BATTLE_FIELDS[BATTLE_FIELDS.length - 1];
  for (let playerSide in SIDES) {
    for (let [name,[displayNumber, _]] of Object.entries(Layout.LAYOUTS)) {
      for(let i = currentSize[name]; i < maxSize[name]; i++) {
        let id = `slot${playerSide}_${displayNumber}_${i}`;
        let slotElement = document.getElementById(id);
        slotElement.style.visibility = 'hidden';
      }
    }
  }
}

function handleBattleData(battleData) {
  battle = battleData;

  hideUnusedSlots(battle.size);

  battleField = new BattleField(battle.size);
  for (let sideNumber of Object.keys(SIDES)) {
    populateField(sideNumber);
  }
  display.showRound();
}

function displayInfoBox(infoBox, dims) {
  infoBox.style.position = "absolute";
  infoBox.style.top = dims.top + "px";
  infoBox.style.left = dims.left + "px";
  infoBox.style.display = "block";
}

function getSlotInfo(playerSide, layoutNum, slotNumber) {
  const side = SIDES[playerSide];
  const layout = Layout.getMetaByNum(layoutNum);
  const battleSide = display.getRound()[side];
  slotInfo = battleSide[layout.name][slotNumber];
  return slotInfo;
}

function updateInfoBox(infoBox) {
  data = infoBox.id.replace('info_', '').split('_');
  slotData = getSlotInfo(...data);
  if (typeof slotData === 'undefined') {
    return;
  }
  let [unitType, _, loss, healthPercent, _2, ammo] = slotData;
  
  let newHtml = `<h2><span><span>${UNITS[unitType]}</span></span></h2>`;
  if (typeof ammo !== 'undefined') {
    newHtml += `<p>Ammunition: ${Math.floor(ammo * 100)}%</p>`;
  }
  newHtml += `<p>Hit points: ${Math.floor(healthPercent * 100)}%</p>`;
  if (loss) {
    newHtml += `<p>Losses: ${loss}</p>`;
  }
  infoBox.innerHTML = newHtml;
}

function on_mouse_enter(event) {
  var id = event.target.id;
  if (id) {
    const dims = event.target.getBoundingClientRect();

    const infoId = event.target.id.replace("slot", "info_");
    let infoBox = document.getElementById(infoId);

    updateInfoBox(infoBox);
    displayInfoBox(infoBox, dims);
  }
}

function on_mouse_leave(event) {
  if (!event.target.id) {
    return;
  }
  const infoId = event.target.id.replace("slot", "info_");
  let infoBox = document.getElementById(infoId);
  infoBox.style.display = 'none';
}

function setup_hover_handlers() {
  for (let slotElement of document.getElementsByClassName("slot")) {
    slotElement.addEventListener("mouseover", on_mouse_enter);
    slotElement.addEventListener("mouseout", on_mouse_leave);
  }
}

function first() {
  display.firstRound();
}

function backward() {
  display.prevRound();
}

function forward() {
  display.nextRound();
}

function last() {
  display.lastRound();
}

function main(battleData) {
  display = new RoundDisplay(battleData)
  // TODO add battleData class
  handleBattleData(battleData);
  setup_hover_handlers();
}

window.addEventListener("DOMContentLoaded", (event) => {
  params = new URLSearchParams(location.search);
  fetch(`fight?id=${params.id}`)
    .then((response) => response.json())
    .then(main);
});