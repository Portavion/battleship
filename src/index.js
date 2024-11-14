import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player, placeShip } from "./player";
import { createGrid } from "./interface";

const humanPlayer = new Player("human");
const computer = new Player("computer");

humanPlayer.placeShip();
computer.placeShip();

createGrid(humanPlayer);
createGrid(computer);

// TODO: refactor createGrid so that it can draw specific player grid (computer or human)
