import { Gameboard } from "./gameboard";

class Player {
	constructor(playerStatus) {
		this.Gameboard = new Gameboard();
		this.playerType = playerStatus;
	}
}
export { Player };
