import { Ship } from "./ship.js";

describe("Ship", () => {
	const ship3 = new Ship(3);

	test("Parameters", () => {
		expect(ship3.length).toBe(3);
		expect(ship3.hits).toBe(0);
		expect(ship3.sunk).toBe(false);
		expect(ship3.coordinates).toStrictEqual([]);
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

describe("Placement", () => {
	const ship3 = new Ship(3);
	const ship2 = new Ship(2);
	const ship4 = new Ship(4);

	test("Placing submarine", () => {
		ship3.place(4, 1, 4, 3);

		expect(ship3.coordinates).toStrictEqual([
			[4, 1],
			[4, 2],
			[4, 3],
		]);
	});

	test("Placing destroyer", () => {
		ship2.place(6, 6, 6, 7);

		expect(ship2.coordinates).toStrictEqual([
			[6, 6],
			[6, 7],
		]);
	});

	test("Placing battleship reverse", () => {
		ship4.place(10, 1, 7, 1);

		expect(ship4.coordinates).toStrictEqual([
			[10, 1],
			[9, 1],
			[8, 1],
			[7, 1],
		]);
	});
});
