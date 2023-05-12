const length = 5;
var canvasWidth = window.innerWidth - 10;
var canvasHeight = window.innerHeight - 10;
var cubeSize = canvasHeight / 8;
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
}