import { Ship } from "./ship.js";

class Gameboard {
	constructor() {
		this.carrier = new Ship(5);
		this.battleship = new Ship(4);
		this.cruiser = new Ship(3);
		this.submarine = new Ship(3);
		this.destroyer = new Ship(2);

		this.missedShot = [];
	}

	receiveAttack(x, y) {
		let fleet = [
			this.carrier,
			this.battleship,
			this.cruiser,
			this.submarine,
			this.destroyer,
		];
		for (let ship in fleet) {
			let currentShip = fleet[ship];
			for (let coordinate in currentShip.coordinates) {
				if (
					x == currentShip.coordinates[coordinate][0] &&
					y == currentShip.coordinates[coordinate][1]
				) {
					currentShip.hit();
					return;
				}
			}
		}
		this.missedShot.push([x, y]); // TODO: sort the missedShot automatically?
	}

	checkAllSunk() {
		let fleet = [
			this.carrier,
			this.battleship,
			this.cruiser,
			this.submarine,
			this.destroyer,
		];
		for (let ship in fleet) {
			let currentShip = fleet[ship];

			if (currentShip.sunk === false) {
				return false;
			}
		}
		return true;
	}
}

export { Gameboard };
