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
computer() {
	let r = 1,
		c = 1;

	while (
		(r != 0 && r != 4 && c != 0 && c != 4) ||
		this.patrat[r][c].value == "o"
	) {
		r = floor(random(0, 5));
		c = floor(random(0, 5));
	}
	if (
		r == 0 &&
		(this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)
	) {
		selectedC = c;
		selectedR = r;
		if (c != 4) this.patrat[r][length - 1].color = "red";
		this.patrat[length - 1][c].color = "red";
		if (c != 0) this.patrat[0][0].color = "red";
	} else if (
		r == 4 &&
		(this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)
	) {
		selectedC = c;
		selectedR = r;
		if (c != 4) this.patrat[4][4].color = "red";
		this.patrat[0][c].color = "red";
		if (c != 0) this.patrat[4][0].color = "red";
	} else if (
		c == 0 &&
		(this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)
	) {
		selectedC = c;
		selectedR = r;
		if (r != 0) this.patrat[0][0].color = "red";
		this.patrat[r][4].color = "red";
		if (r != 4) this.patrat[4][0].color = "red";
	} else if (
		c == 4 &&
		(this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)
	) {
		selectedC = c;
		selectedR = r;
		if (r != 0) this.patrat[0][4].color = "red";
		this.patrat[r][0].color = "red";
		if (r != 4) this.patrat[4][4].color = "red";
	}

	while (
		(r != 0 && r != 4 && c != 0 && c != 4) ||
		this.patrat[r][c].color != "red"
	) {
		r = floor(random(0, 5));
		c = floor(random(0, 5));
	}

	if (this.patrat[r][c].color == "red") {
		if (r == 0 && c != 0 && c != 4) {
			this.patrat[4][c].value = this.patrat[3][c].value;
			this.patrat[3][c].value = this.patrat[2][c].value;
			this.patrat[2][c].value = this.patrat[1][c].value;
			this.patrat[1][c].value = this.patrat[0][c].value;
		}

		if (r == 4 && c != 0 && c != 4) {
			this.patrat[0][c].value = this.patrat[1][c].value;
			this.patrat[1][c].value = this.patrat[2][c].value;
			this.patrat[2][c].value = this.patrat[3][c].value;
			this.patrat[3][c].value = this.patrat[4][c].value;
		}

		if (c == 0 && r != 0 && r != 4) {
			this.patrat[r][4].value = this.patrat[r][3].value;
			this.patrat[r][3].value = this.patrat[r][2].value;
			this.patrat[r][2].value = this.patrat[r][1].value;
			this.patrat[r][1].value = this.patrat[r][0].value;
		}

		if (c == 4 && r != 0 && r != 4) {
			this.patrat[r][0].value = this.patrat[r][1].value;
			this.patrat[r][1].value = this.patrat[r][2].value;
			this.patrat[r][2].value = this.patrat[r][3].value;
			this.patrat[r][3].value = this.patrat[r][4].value;
		}

		if (r == 0 && c == 0) {
			if (selectedR == r) {
				for (let i = selectedC; i > 0; i--)
					this.patrat[0][i].value = this.patrat[0][i - 1].value;
			}
			if (selectedC == c) {
				for (let i = selectedR; i > 0; i--)
					this.patrat[i][0].value = this.patrat[i - 1][0].value;
			}
		}

		if (r == 0 && c == 4) {
			if (selectedR == r) {
				for (let i = selectedC; i < 4; i++)
					this.patrat[0][i].value = this.patrat[0][i + 1].value;
			}
			if (selectedC == c) {
				for (let i = selectedR; i > 0; i--)
					this.patrat[i][4].value = this.patrat[i - 1][4].value;
			}
		}

		if (r == 4 && c == 4) {
			if (selectedR == r) {
				for (let i = selectedC; i < 4; i++)
					this.patrat[4][i].value = this.patrat[4][i + 1].value;
			}
			if (selectedC == c) {
				for (let i = selectedR; i < 4; i++)
					this.patrat[i][4].value = this.patrat[i + 1][4].value;
			}
		}
		if (r == 4 && c == 0) {
			if (selectedR == r) {
				for (let i = selectedC; i > 0; i--)
					this.patrat[4][i].value = this.patrat[4][i - 1].value;
			}
			if (selectedC == c) {
				for (let i = selectedR; i < 4; i++)
					this.patrat[i][0].value = this.patrat[i + 1][0].value;
			}
		}
		this.patrat[r][c].value = "x";
		change = "o";
	}
	for (let i = 0; i < length; i++)
		for (let j = 0; j < length; j++)
			if (this.patrat[i][j].color == "red") this.patrat[i][j].color = "";
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
