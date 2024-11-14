import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { createGrid } from "./interface";

const humanPlayer = new Player("human");
const computer = new Player("computer");

placeShip(humanPlayer);
placeShip(computer);

function placeShip(humanPlayer) {
	humanPlayer.Gameboard.carrier.place(5, 10, 10, 10);
	humanPlayer.Gameboard.battleship.place(7, 1, 10, 1);
	humanPlayer.Gameboard.cruiser.place(4, 1, 4, 3);
	humanPlayer.Gameboard.submarine.place(6, 3, 8, 3);
	humanPlayer.Gameboard.destroyer.place(7, 6, 7, 7);
}

createGrid(humanPlayer);
createGrid(computer);

// TODO: refactor createGrid so that it can draw specific player grid (computer or human)
