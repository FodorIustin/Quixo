const length = 5;
var canvasWidth = window.innerWidth - 10;
var canvasHeight = window.innerHeight - 10;
var cubeSize = canvasHeight / 8;
if (canvasWidth < canvasHeight) cubeSize = canvasWidth / 8;
var tableHeightSide = (canvasHeight - cubeSize * 5) / 2;
var tableWidthSide = (canvasWidth - cubeSize * 5) / 2;
class Patrat {
	// constructor
	initializare(patrat = null) {
		if (patrat) {
			// daca am primit un patrat
			this.patrat = patrat; //copiaza patratul
		} else {
			// daca nu am primit un patrat
			this.patrat = []; //initializeaza patratul
			for (let r = 0; r < length; r++) {
				//parcurgem patratul
				this.patrat[r] = []; //initializeaza linia
				for (let c = 0; c < length; c++) {
					//parcurgem linia
					let valueObj = {
						//initializeaza valoarea
						value: "0", //initializeaza valoarea
						color: "white", //initializeaza culoarea
					};
					this.patrat[r][c] = valueObj; //adauga valoarea in linia
				}
			}
		}
	}

	afisare(xInit, y) {
		//afiseaza patratul
		let x = xInit;
		for (var r = 0; r < length; r++) {
			x = xInit;
			for (var c = 0; c < length; c++) {
				stroke("black");
				strokeWeight(3);
				fill(this.patrat[r][c].color);
				rect(x, y, cubeSize, cubeSize);
				x += cubeSize;
			}
			y += cubeSize;
		}
	}
	reset() {
		//reseteaza patratul
		for (let r = 0; r < length; r++)
			for (let c = 0; c < length; c++) {
				this.patrat[r][c].color = "white";
				this.patrat[r][c].value = "";
			}
	}
	clicked(my, mx) {
		//verifica daca am dat click pe patrat
		for (let r = 0; r < length; r++)
			for (let c = 0; c < length; c++)
				if (
					mx >= 20 + cubeSize * r &&
					mx <= 20 + cubeSize + cubeSize * r &&
					my >= 20 + cubeSize * c &&
					my <= 20 + cubeSize + cubeSize * c
				)
					this.patrat[r][c].color = "blue";
	}
}

var patrat = new Patrat();
var resetbt;
let playerInput;
let playerName;
let playerName2;
let playerInput2;
function setup() {
	//functie care initializeaza patratul
	createCanvas(canvasWidth, canvasHeight);
	patrat.initializare();
	resetbt = createButton("RESET");
	resetbt.position(440, 20);
	resetbt.size(60, 25);
	resetbt.mousePressed(reset);
	resetbt.style("background-color", "lightgrey");

				playerInput2 = createInput();
				playerInput2.position(400, 380);

				let adddButton = createButton("Add name");
				adddButton.position(400, 410);
				adddButton.mousePressed(addName2);

				playerInput = createInput();
				playerInput.position(20, 380);
			
				let addButton = createButton("Add name");
				addButton.position(20, 410);
				addButton.mousePressed(addName);

}
function mouseClicked() {
	//functie care verifica daca butonul a fost apasat
	patrat.clicked(mouseX, mouseY);
}
function reset() {
	//functie care reseteaza patratul
	patrat.reset();
	playerName = "";
  playerInput.value("");
	playerName2 = "";
  playerInput2.value("");
}
function name() {
	clear();
	name1 = "Player One" + inp.value();
}
function name2() {
	clear();
	name2 = "Player Two" + inp2.value();
}
function addName() {
  playerName = playerInput.value();
}
function addName2() {
  playerName2 = playerInput2.value();
}
function draw() {
	//functie care deseneaza patratul
	background("lightblue");
	patrat.afisare(20, 20);

	textSize(32);
  textAlign(CENTER, CENTER);
  text(playerName, 140, 415);

	textSize(32);
  textAlign(CENTER, CENTER);
	text(playerName2, 550, 415);
}
