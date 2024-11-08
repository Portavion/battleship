import { Ship } from "./ship.js";

describe("Ship", () => {
	const ship3 = new Ship(3);

	test("Parameters", () => {
		expect(ship3.length).toBe(3);
		expect(ship3.hits).toBe(0);
		expect(ship3.sunk).toBe(false);
	});
});

describe("Hits", () => {
	const ship3 = new Ship(3);

	test("1 hit", () => {
		ship3.hit();
		expect(ship3.hits).toBe(1);
		expect(ship3.sunk).toBe(false);
	});

	test("2 hits", () => {
		ship3.hit();
		expect(ship3.hits).toBe(2);
		expect(ship3.sunk).toBe(false);
	});

	test("3 hits", () => {
		ship3.hit();
		expect(ship3.hits).toBe(3);
		expect(ship3.sunk).toBe(true);
	});
});
