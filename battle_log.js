const units = {
	1: "Hoplite",
	2: 'Steam Giant',
	3: 'Spearmen',
	4: 'Swordsman',
	5: 'Slinger',
	6: 'Archer',
	7: 'Sulfur Carabineers',
	8: 'Battering Ram',
	9: 'Catapult',
	10: 'Mortar',
	11: 'Gyrocopter',
	12: 'Balloon-Bombardier',
	13: 'Cook',
	14: 'Doctor',
	15: 'Barbarian-Axe Swinger',
	16: 'Ram Ship',
	17: 'Fire Ship',
	18: 'Paddle Speedboat',
	19: 'Ballista Ship',
	20: 'Catapult Ship',
	21: 'Mortar Ship',
	22: 'Diving Boat',
	23: 'Merchant Ship',
	24: 'Steam Ram',
	25: 'Rocket Ship',
	26: 'Balloon Carrier',
	27: 'Tender',
}

var layout = {
	"flank": 1,
	"front": 2,
	"range": 3,
	"artillery": 4,
	"bomber": 5,
	
}

var round = 1;

fetch('fight.json')
  .then(response => response.json())
  .then(data => console.log(data));
function showRound() {
  e = document.getElementById("slot11_21_5")
  console.log(e)
}

// Event.onDOMReady(main)
window.addEventListener('DOMContentLoaded', (event) => {
    showRound();
});

function forward() {
	console.log("forward")
}