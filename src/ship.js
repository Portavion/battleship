class Ship {
	constructor(length) {
		this.length = length;
		this.hits = 0;
		this.sunk = false;
	}
	hit() {
		this.hits++;
		this.sunk = this.isSunk();
	}
	isSunk() {
		if (this.hits === this.length) {
			return true;
		} else {
			return false;
		}
	}
}

export { Ship };
