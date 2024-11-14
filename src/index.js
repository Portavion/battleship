import "./styles.css";
import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player, placeShip } from "./player";
import { createGrid, drawShip } from "./interface";

const humanPlayer = new Player(1);
const computer = new Player(2);

humanPlayer.placeShip();
computer.placeShip();

createGrid(humanPlayer);
createGrid(computer);

drawShip(humanPlayer);
