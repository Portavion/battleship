import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { log } from "console";

describe("Placing ships", () => {
	const gameboard = new Gameboard();

	test("definition", () => {
		expect(gameboard).toBeInstanceOf(Object);
	});

	test("Gameboard has ships", () => {
		expect(gameboard.carrier).toBeInstanceOf(Ship);
		expect(gameboard.battleship).toBeInstanceOf(Ship);
		expect(gameboard.cruiser).toBeInstanceOf(Ship);
		expect(gameboard.submarine).toBeInstanceOf(Ship);
		expect(gameboard.destroyer).toBeInstanceOf(Ship);
	});

	gameboard.destroyer.place(6, 6, 6, 7);

	test("Destroyer at the right place", () => {
		expect(gameboard.destroyer.coordinates).toStrictEqual([
			[6, 6],
			[6, 7],
		]);
	});
});

describe("Receive attack", () => {
	const gameboard = new Gameboard();
	gameboard.destroyer.place(6, 6, 6, 7);

	test("Receive a hit", () => {
		gameboard.receiveAttack(6, 6);
		expect(gameboard.destroyer.hits).toBe(1);
	});

	test("Records a missed shot", () => {
		gameboard.receiveAttack(6, 5);
		expect(gameboard.destroyer.hits).toBe(1);
		expect(gameboard.missedShot).toStrictEqual([[6, 5]]);
	});
});

describe("Test all ships are sinked", () => {
	const gameboard = new Gameboard();
	gameboard.destroyer.sunk = true;
	gameboard.submarine.sunk = true;
	gameboard.cruiser.sunk = true;
	gameboard.battleship.sunk = true;

	expect(gameboard.checkAllSunk()).toBe(false);

	gameboard.carrier.sunk = true;

	expect(gameboard.checkAllSunk()).toBe(true);
});
