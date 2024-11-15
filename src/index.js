import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player, placeShip } from "./player";
import { createGrids, drawShip, playerTurn, computerTurn } from "./interface";

const humanPlayer = new Player("player");
const computer = new Player("computer");

humanPlayer.placeShip();
computer.placeShip();

createGrids([humanPlayer, computer]);
playerTurn();
// drawShip(humanPlayer);
