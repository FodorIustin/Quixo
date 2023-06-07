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
				stroke("black");
				strokeWeight(2);
				fill("rgb(194,178,128)");
				if (change == "o") {
				}
				if (this.patrat[r][c].color == "red") fill("red");
				else fill("rgb(194,178,128)");
				rect(x, y, cubeSize, cubeSize);
				if (this.patrat[r][c].value == "o") {
					circle(x + cubeSize / 2, y + cubeSize / 2, cubeSize / 1.4);
					fill("rgb(194,178,128)");
					circle(x + cubeSize / 2, y + cubeSize / 2, cubeSize / 1.5);
					fill("black");
					circle(x + cubeSize / 2, y + cubeSize / 4, cubeSize / 13);
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
computer() {
  let r = 1, // Initialize row variable
    c = 1; // Initialize column variable

  // Loop until a valid position is found
  while ((r != 0 && r != 4 && c != 0 && c != 4) || this.patrat[r][c].value == "o") {
    r = floor(random(0, 5)); // Generate a random row index between 0 and 4
    c = floor(random(0, 5)); // Generate a random column index between 0 and 4
  }

  // Check for specific conditions to determine the selected row and column
  if (r == 0 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
    selectedC = c;
    selectedR = r;
    if (c != 4) this.patrat[r][length - 1].color = "red"; // Highlight the rightmost cell in the current row
    this.patrat[length - 1][c].color = "red"; // Highlight the bottommost cell in the current column
    if (c != 0) this.patrat[0][0].color = "red"; // Highlight the top-left cell
  } else if (r == 4 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
    selectedC = c;
    selectedR = r;
    if (c != 4) this.patrat[4][4].color = "red"; // Highlight the bottom-right cell
    this.patrat[0][c].color = "red"; // Highlight the topmost cell in the current column
    if (c != 0) this.patrat[4][0].color = "red"; // Highlight the bottom-left cell
  } else if (c == 0 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
    selectedC = c;
    selectedR = r;
    if (r != 0) this.patrat[0][0].color = "red"; // Highlight the top-left cell
    this.patrat[r][4].color = "red"; // Highlight the rightmost cell in the current row
    if (r != 4) this.patrat[4][0].color = "red"; // Highlight the bottom-left cell
  } else if (c == 4 && (this.patrat[r][c].value == "0" || this.patrat[r][c].value == change)) {
    selectedC = c;
    selectedR = r;
    if (r != 0) this.patrat[0][4].color = "red"; // Highlight the top-right cell
    this.patrat[r][0].color = "red"; // Highlight the leftmost cell in the current row
    if (r != 4) this.patrat[4][4].color = "red"; // Highlight the bottom-right cell
  }

  // Loop until a valid red cell is found
  while ((r != 0 && r != 4 && c != 0 && c != 4) || this.patrat[r][c].color != "red") {
    r = floor(random(0, 5)); // Generate a random row index between 0 and 4
    c = floor(random(0, 5)); // Generate a random column index between 0 and 4
  }

  // If the selected cell is red
  if (this.patrat[r][c].color == "red") {
    if (r == 0 && c != 0 && c != 4) {
      this.patrat[4][c].value = this.patrat[3][c].value; // Move values down in the same column
      this.patrat[3][c].value = this.patrat[2][c].value;
      this.patrat[2][c].value = this.patrat[1][c].value;
      this.patrat[1][c].value = this.patrat[0][c].value;
    }
    if (r == 4 && c != 0 && c != 4) {
      this.patrat[0][c].value = this.patrat[1][c].value; // Move values up in the same column
      this.patrat[1][c].value = this.patrat[2][c].value;
      this.patrat[2][c].value = this.patrat[3][c].value;
      this.patrat[3][c].value = this.patrat[4][c].value;
    }
    if (c == 0 && r != 0 && r != 4) {
      this.patrat[r][4].value = this.patrat[r][3].value; // Move values to the right in the same row
      this.patrat[r][3].value = this.patrat[r][2].value;
      this.patrat[r][2].value = this.patrat[r][1].value;
      this.patrat[r][1].value = this.patrat[r][0].value;
    }
    if (c == 4 && r != 0 && r != 4) {
      this.patrat[r][0].value = this.patrat[r][1].value; // Move values to the left in the same row
      this.patrat[r][1].value = this.patrat[r][2].value;
      this.patrat[r][2].value = this.patrat[r][3].value;
      this.patrat[r][3].value = this.patrat[r][4].value;
    }

    if (r == 0 && c == 0) {
      if (selectedR == r) {
        for (let i = selectedC; i > 0; i--)
          this.patrat[0][i].value = this.patrat[0][i - 1].value; // Move values to the left in the same row
      }
      if (selectedC == c) {
        for (let i = selectedR; i > 0; i--)
          this.patrat[i][0].value = this.patrat[i - 1][0].value; // Move values up in the same column
      }
    }

    // Perform similar value movements for other corner cases

    this.patrat[r][c].value = "x"; // Set the selected cell's value to "x"
    change = "o"; // Update the value of the "change" variable
  }

  // Reset the color of all red cells to empty
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
			if (name == "o") win = player1 + " won the game ♛";
			else win = player2 + " won the game ♛";
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
			if (name == "o") win = player1 + " won the game ♛";
			else win = player2 + " won the game ♛";
		}
	if (
		this.patrat[0][4].value == this.patrat[1][3].value &&
		this.patrat[1][3].value == this.patrat[2][2].value &&
		this.patrat[0][4].value != "0" &&
		this.patrat[2][2].value == this.patrat[3][1].value &&
		this.patrat[3][1].value == this.patrat[4][0].value
	) {
		if (name == "o") win = player1 + " won the game ♛";
		else win = player2 + " won the game ♛";
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
			if (name == "o") win = player1 + " won the game ♛ ";
			else win = player2 + " won the game ♛";
			c = length;
		}
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
