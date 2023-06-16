const length = 5;
computerCount = 0;
var change = "o";
var selectedR = 6,
	selectedC = 6;
var check = 6;
var canvasWidth = window.innerWidth - 30;
var canvasHeight = window.innerHeight - 20;
var cubeSize = canvasHeight / 8;
var tableHeightSide = (canvasHeight - cubeSize * 5) / 2;
var tableWidthSide = (canvasWidth - cubeSize * 5) / 2;
var humanOrCopmuter = "null";
class Patrat {
	initializare(patrat = null) {

		this.patrat = [];
		for (let r = 0; r < length; r++) {
			this.patrat[r] = [];
			for (let c = 0; c < length; c++) {
				let valueObj = {
					value: "0",

				};
				this.patrat[r][c] = valueObj;
			}
		}

	}

	afisare(xInit, y) {
		let x = xInit;
		for (var r = 0; r < length; r++) {
			x = xInit;
			for (var c = 0; c < length; c++) {
				stroke("black");
				strokeWeight(2)
				if (this.patrat[r][c].color == "red") fill("red");
				else fill("rgb(194,178,128)");

				rect(x, y, cubeSize, cubeSize);


				if (this.patrat[r][c].value == "o") {
					strokeWeight(3);
					circle(x + cubeSize / 2, y + cubeSize / 2, cubeSize / 1.4);
					fill("rgb(194,178,128)");
					circle(x + cubeSize / 2, y + cubeSize / 2, cubeSize / 2);
					fill("rgb(194,178,128)");
					fill("black");
					circle(x + cubeSize / 2, y + cubeSize / 2, cubeSize / 3.5);
					fill("rgb(194,178,128)");
				}

				if (this.patrat[r][c].value == "x") {
					strokeWeight(3);
					line(
						x + cubeSize / 6,
						y + cubeSize / 6,
						x + cubeSize / 1.15,
						y + cubeSize / 1.2
					);
					line(
						x + cubeSize / 15,
						y + cubeSize / 1.2,
						x + cubeSize / 1.15,
						y + cubeSize / 6
					);
				}

				x += cubeSize;
			}
			y += cubeSize;
		}
	}


	reset() {
		for (let r = 0; r < length; r++)
			for (let c = 0; c < length; c++) {
				this.patrat[r][c].value = "0";
				this.patrat[r][c].color = "rgb(237,201,175)";
				win = "";
			}
	}
	name1() {
		player1 = name1inp.value();
		name1bt.hide();
		name1inp.hide();
	}
	name2() {
		player2 = name2inp.value();
		name2bt.hide();
		name2inp.hide();
	}
	computer() {
		let r = 1,
			c = 1;

		while ((r != 0 && r != 4 && c != 0 && c != 4) || this.patrat[r][c].value == "o") {
			r = floor(random(0, 5));
			c = floor(random(0, 5));
		}

		//conditii pentru coloane si randuri
		if (r == 0 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
			selectedC = c;
			selectedR = r;
			if (c != 4) this.patrat[r][length - 1].color = "red"; // cel mai din dreapta patrat
			this.patrat[length - 1][c].color = "red"; // cel mai din jos patrat
			if (c != 0) this.patrat[0][0].color = "red"; // cea mai din stanga sus
		} else if (r == 4 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
			selectedC = c;
			selectedR = r;
			if (c != 4) this.patrat[4][4].color = "red"; // cel mai din drapta jos
			this.patrat[0][c].color = "red"; // cea mai de sus
			if (c != 0) this.patrat[4][0].color = "red"; // cea mai din stanga sus
		} else if (c == 0 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
			selectedC = c;
			selectedR = r;
			if (r != 0) this.patrat[0][0].color = "red"; // cea mai din stanga 
			this.patrat[r][4].color = "red"; // cea mai din dreapta
			if (r != 4) this.patrat[4][0].color = "red"; // cea mai din stanga
		} else if (c == 4 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
			selectedC = c;
			selectedR = r;
			if (r != 0) this.patrat[0][4].color = "red"; // cea mai din dreapta sus
			this.patrat[r][0].color = "red"; // cea mai din stanga
			if (r != 4) this.patrat[4][4].color = "red"; // cea mai din drepata jos
		}
		while ((r != 0 && r != 4 && c != 0 && c != 4) || this.patrat[r][c].color != "red") {
			r = floor(random(0, 5));
			c = floor(random(0, 5));
		}

		if (this.patrat[r][c].color == "red") {
			if (r == 0 && c != 0 && c != 4) {
				this.patrat[4][c].value = this.patrat[3][c].value; // scad valorile pe aceeasi coloana
				this.patrat[3][c].value = this.patrat[2][c].value;
				this.patrat[2][c].value = this.patrat[1][c].value;
				this.patrat[1][c].value = this.patrat[0][c].value;
			}
			if (r == 4 && c != 0 && c != 4) {
				this.patrat[0][c].value = this.patrat[1][c].value; // urca valorile pe aceeasi coloana
				this.patrat[1][c].value = this.patrat[2][c].value;
				this.patrat[2][c].value = this.patrat[3][c].value;
				this.patrat[3][c].value = this.patrat[4][c].value;
			}
			if (c == 0 && r != 0 && r != 4) {
				this.patrat[r][4].value = this.patrat[r][3].value; // cresc pe dreapta pe acelasi rand
				this.patrat[r][3].value = this.patrat[r][2].value;
				this.patrat[r][2].value = this.patrat[r][1].value;
				this.patrat[r][1].value = this.patrat[r][0].value;
			}
			if (c == 4 && r != 0 && r != 4) {
				this.patrat[r][0].value = this.patrat[r][1].value; // cresc pe stanga pe acelasi rand
				this.patrat[r][1].value = this.patrat[r][2].value;
				this.patrat[r][2].value = this.patrat[r][3].value;
				this.patrat[r][3].value = this.patrat[r][4].value;
			}

			if (r == 0 && c == 0) {
				if (selectedR == r) {
					for (let i = selectedC; i > 0; i--)
						this.patrat[0][i].value = this.patrat[0][i - 1].value; //stanga pe acelasi rand
				}
				if (selectedC == c) {
					for (let i = selectedR; i > 0; i--)
						this.patrat[i][0].value = this.patrat[i - 1][0].value; // sus pe aceeasi coloana
				}
			}

			this.patrat[r][c].value = "x";
			change = "o";
		}
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				if (this.patrat[i][j].color == "red") {
					this.patrat[i][j].color = "";
				}
			}
		}
	}

	clicked(mousex, mousey) {
		if (humanOrCopmuter == "computer" && change == "x") this.computer();
		else {
			for (let r = 0; r < length; r++)
				for (let c = 0; c < length; c++)
					if (
						mousey >= tableHeightSide + cubeSize * r &&
						mousey <= tableHeightSide + cubeSize + cubeSize * r &&
						mousex >= tableWidthSide + cubeSize * c &&
						mousex <= tableWidthSide + cubeSize + cubeSize * c &&
						(c < 1 || c > length - 2 || r == 0 || r == length - 1)
					) {
						if (this.patrat[r][c].color != "red") {
							if (check != 6) this.patrat[selectedR][selectedC].value = change;
							for (let i = 0; i < length; i++)
								for (let j = 0; j < length; j++)
									if (this.patrat[i][j].color == "red")
										this.patrat[i][j].color = "";
						}

						if (this.patrat[r][c].color == "red") {
							for (let i = 0; i < length; i++)
								for (let j = 0; j < length; j++)
									if (this.patrat[i][j].color == "red")
										this.patrat[i][j].color = "";

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
							this.patrat[r][c].value = change;
							check = 6;
							if (change == "o") change = "x";
							else change = "o";
						} else if (
							r == 0 &&
							(this.patrat[r][c].value == "0" ||
								this.patrat[r][c].value == change)
						) {
							if (this.patrat[r][c].value == change) {
								this.patrat[r][c].value = "0";
								check = 1;
							}
							selectedC = c;
							selectedR = r;
							if (c != 4) this.patrat[r][length - 1].color = "red";
							this.patrat[length - 1][c].color = "red";
							if (c != 0) this.patrat[0][0].color = "red";
						} else if (
							r == 4 &&
							(this.patrat[r][c].value == "0" ||
								this.patrat[r][c].value == change)
						) {
							if (this.patrat[r][c].value == change) {
								this.patrat[r][c].value = "0";
								check = 1;
							}
							selectedC = c;
							selectedR = r;
							if (c != 4) this.patrat[4][4].color = "red";
							this.patrat[0][c].color = "red";
							if (c != 0) this.patrat[4][0].color = "red";
						} else if (
							c == 0 &&
							(this.patrat[r][c].value == "0" ||
								this.patrat[r][c].value == change)
						) {
							if (this.patrat[r][c].value == change) {
								this.patrat[r][c].value = "0";
								check = 1;
							}
							selectedC = c;
							selectedR = r;
							if (r != 0) this.patrat[0][0].color = "red";
							this.patrat[r][4].color = "red";
							if (r != 4) this.patrat[4][0].color = "red";
						} else if (
							c == 4 &&
							(this.patrat[r][c].value == "0" ||
								this.patrat[r][c].value == change)
						) {
							if (this.patrat[r][c].value == change) {
								this.patrat[r][c].value = "0";
								check = 1;
							}
							selectedC = c;
							selectedR = r;
							if (r != 0) this.patrat[0][4].color = "red";
							this.patrat[r][0].color = "red";
							if (r != 4) this.patrat[4][4].color = "red";
						}
					}
		}
	}
	winner() {
		let count;
		let name;

		for (let r = 0; r < length; r++) {
			count = 0;
			for (let c = 1; c < length; c++) {
				if (
					this.patrat[r][c].value != this.patrat[r][c - 1].value ||
					this.patrat[r][c].value == "0"
				)
					count++;
				name = this.patrat[r][c].value;
			}

			if (count == 0) {
				if (name == "o") win = player1 + " won the game ";
				else win = player2 + " won the game ";
				r = length;
			}
		}
		if (this.patrat[0][0].value != 0)
			if (
				this.patrat[0][0].value == this.patrat[1][1].value &&
				this.patrat[1][1].value == this.patrat[2][2].value &&
				this.patrat[2][2].value == this.patrat[3][3].value &&
				this.patrat[3][3].value == this.patrat[4][4].value
			) {
				if (name == "o") win = player1 + " won the game ";
				else win = player2 + " won the game ";
			}
		if (
			this.patrat[0][4].value == this.patrat[1][3].value &&
			this.patrat[1][3].value == this.patrat[2][2].value &&
			this.patrat[0][4].value != "0" &&
			this.patrat[2][2].value == this.patrat[3][1].value &&
			this.patrat[3][1].value == this.patrat[4][0].value
		) {
			if (name == "o") win = player1 + " won the game ";
			else win = player2 + " won the game ";
		}


		for (let c = 0; c < length; c++) {
			count = 0;
			for (let r = 1; r < length; r++) {
				if (
					this.patrat[r - 1][c].value != this.patrat[r][c].value ||
					this.patrat[r][c].value == "0"
				)
					count++;
				name = this.patrat[r][c].value;
			}

			if (count == 0) {
				if (name == "o") win = player1 + " won the game  ";
				else win = player2 + " won the game ";
				c = length;
			}
		}
	}
}
var patrat = new Patrat();
var resetbt;
var back;
var name1bt, name2bt;
var name1inp, name2inp;
var humanbt, computerbt;

var player1 = "", player2 = "";
var win = "";

function setup() {

	createCanvas(canvasWidth, canvasHeight);
	patrat.initializare();
	humanbt = createButton("Jucator vs Jucator");
	computerbt = createButton("Jucator vs Calculator");
	humanbt.position(canvasWidth / 2 - 50, canvasHeight / 3);
	computerbt.position(canvasWidth / 2 - 60, canvasHeight / 1.5);
	humanbt.mousePressed(human);
	computerbt.mousePressed(computer);
}
function mouseClicked() {
	patrat.clicked(mouseX, mouseY);
}

function name1() {
	patrat.name1();
}

function name2() {
	patrat.name2();
}

function reset() {
	patrat.reset();
	player1 = "";
	player2 = "";
}

function creatNameInput() {
	name1inp = createInput("Player O");
	name1inp.position(
		tableWidthSide + cubeSize * 1.5,
		tableHeightSide - cubeSize / 2
	);
	name1inp.size(cubeSize * 2, 10);
	name2inp = createInput("Player X");
	name2inp.position(
		tableWidthSide + cubeSize * 1.5,
		tableHeightSide + cubeSize * 5.5
	);
	name2inp.size(cubeSize * 2, 10);
	name1bt = createButton("Add name");
	name1bt.position(
		tableWidthSide + cubeSize * 1.5 + cubeSize - 8,
		tableHeightSide - cubeSize / 3
	);
	name2bt = createButton("Add name");
	name2bt.position(
		tableWidthSide + cubeSize * 1.5 + cubeSize - 8,
		tableHeightSide + cubeSize * 5.23
	);
	name1bt.mousePressed(name1);
	name2bt.mousePressed(name2);
	resetbt = createButton("RESET");
	resetbt.position(100, 25);
	resetbt.size(90, 55);
	resetbt.mousePressed(reset);
	resetbt.style("background-color", "rgb(240, 168, 104)");
}

function human() {
	humanOrCopmuter = "human";
	humanbt.hide();
	computerbt.hide();
	creatNameInput();
}

function computer() {
	humanOrCopmuter = "computer";
	humanbt.hide();
	computerbt.hide();
	creatNameInput();
}
function draw() {
	background("brown");
	//patrat.afisare(500,120);
	patrat.winner();
	//background(back);
	if (humanOrCopmuter == "null")
		fill("black");
	text("Selecteaza modul de joc", canvasWidth / 2, canvasHeight / 2);
	if (win == "" && humanOrCopmuter != "null")
		patrat.afisare(tableWidthSide, tableHeightSide);
	else text(win, canvasWidth / 2 - 250, canvasHeight / 2);
	textSize(50);

	fill("rgb(240, 168, 104)");
	textSize(32);
	textAlign(CENTER, CENTER);
	text(player1, 200, 150);

	fill("rgb(240, 168, 104)");
	textSize(32);
	textAlign(CENTER, CENTER);
	text(player2, 1100, 150);
}




