import { Ship } from "./ship.js";

class Gameboard {
	constructor() {
		this.carrier = new Ship(5);
		this.battleship = new Ship(4);
		this.cruiser = new Ship(3);
		this.submarine = new Ship(3);
		this.destroyer = new Ship(2);

		this.missedShot = [];
		this.hitShot = [];
		this.lost = false;
	}

	receiveAttack(x, y) {
		let fleet = [
			this.carrier,
			this.battleship,
			this.cruiser,
			this.submarine,
			this.destroyer,
		];
		x = Number(x);
		y = Number(y);

		for (let ship in fleet) {
			let currentShip = fleet[ship];
			for (let coordinate in currentShip.coordinates) {
				if (
					x == currentShip.coordinates[coordinate][0] &&
					y == currentShip.coordinates[coordinate][1]
				) {
					currentShip.hit();
					this.hitShot.push([x, y]);
					return;
				}
			}
		}
		this.missedShot.push([x, y]);
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
		this.lost = true;
		return true;
	}

	checkPlayed(coord) {
		for (let shot in this.missedShot) {
			if (coord[0] === this.missedShot[shot][0]) {
				if (coord[1] === this.missedShot[shot][1]) {
					return true;
				}
			}
		}
		for (let shot in this.hitShot) {
			if (coord[0] === this.hitShot[shot][0]) {
				if (coord[1] === this.hitShot[shot][1]) {
					return true;
				}
			}
		}
	}
}

export { Gameboard };
