class Ship {
	constructor(length) {
		this.length = length;
		this.hits = 0;
		this.sunk = false;
		this.coordinates = [];
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
	place(x1, y1, x2, y2) {
		this.coordinates.push([x1, y1]);

		if (this.length != 2) {
			if (x1 - x2 === 0) {
				for (let i = 1; i < this.length - 1; i++) {
					if (y2 > y1) {
						this.coordinates.push([x1, y1 + i]);
					} else {
						this.coordinates.push([x1, y1 - i]);
					}
				}
			} else {
				for (let i = 1; i < this.length - 1; i++) {
					if (x2 > x1) {
						this.coordinates.push([x1 + i, y1]);
					} else {
						this.coordinates.push([x1 - i, y1]);
					}
				}
			}
		}
		this.coordinates.push([x2, y2]);
	}
}

export { Ship };
