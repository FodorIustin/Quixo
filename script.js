const length = 5;
var canvasWidth = window.innerWidth - 10;
var canvasHeight = window.innerHeight - 10;
var cubeSize = canvasHeight / 8;

//initializarea tablei si a patratelor
class Patrat {
	// constructor
	initializare(patrat) {
		this.patrat = [];
		for (let r = 0; r < length; r++) {
			//parcurgem patratul
			this.patrat[r] = []; //initializeaza linia
			for (let c = 0; c < length; c++) {
				//parcurgem linia
				let valueObj = {
					color: "white", //initializeaza culoarea
				};
				this.patrat[r][c] = valueObj;
			}
		}
	}

	//partea de afisare, marigini,culori
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
					this.patrat[r][c].color = "green";
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
	resetbt.position(550, 20);
	resetbt.size(100, 40);
	resetbt.mousePressed(reset);
	resetbt.style("background-color", "lightgrey");

	playerInput2 = createInput();
	playerInput2.position(400, 500);

	let adddButton = createButton("Add name");
	adddButton.position(400, 530);
	adddButton.mousePressed(addName2);

	playerInput = createInput();
	playerInput.position(20, 500);

	let addButton = createButton("Add name");
	addButton.position(20, 530);
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
function addName() {
	playerName = playerInput.value();
}
function addName2() {
	playerName2 = playerInput2.value();
}
function draw() {
	//functie care deseneaza patratul
	background("lightgreen");
	patrat.afisare(20, 20);

	textSize(32);
	textAlign(CENTER, CENTER);
	text(playerName, 140, 430);

	textSize(32);
	textAlign(CENTER, CENTER);
	text(playerName2, 550, 430);
}
