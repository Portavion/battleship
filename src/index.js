import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { createGrid } from "./interface";

const realPlayer = new Player();
const computer = new Player();

placeShip(realPlayer);
placeShip(computer);

function placeShip(player) {
	player.Gameboard.carrier.place(5, 10, 10, 10);
	player.Gameboard.battleship.place(7, 1, 10, 1);
	player.Gameboard.cruiser.place(4, 1, 4, 3);
	player.Gameboard.submarine.place(6, 3, 8, 3);
	player.Gameboard.destroyer.place(7, 6, 7, 7);
}

createGrid();

// TODO: refactor createGrid so that it can draw specific player grid (computer or human)
