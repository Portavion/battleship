import { experiments } from "webpack";
import { Player } from "./player.js";

describe("Players class", () => {
	const RealPlayer = new Player();
	const ComputerPlayer = new Player();

	test("definition", () => {
		expect(RealPlayer).toBeInstanceOf(Object);
	});

	test("Has its own gameboard", () => {
		expect(RealPlayer.Gameboard).toBeInstanceOf(Object);
	});

	test("Players have different instanced of gameboard", () => {
		expect(RealPlayer.Gameboard).not.toBe(ComputerPlayer.Gameboard);
	});
});
