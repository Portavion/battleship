function createGrids(players) {
	if (players[0].lost === true || players[1].lost === true) {
		return;
	}
	const resolution = 121;
	let container;

	const computerBoard = document.querySelector(".computer");
	if (players[0].lost === false && players[1].lost === false) {
		for (let j in players) {
			let player = players[j];

			if (player.name === "player") {
				container = document.querySelector(".player");
			} else {
				container = document.querySelector(".computer");
			}
			let pixels = [];

			cleanGrid(player);

			for (let i = 0; i < resolution; i++) {
				pixels.push(document.createElement("div"));
				pixels[i].className = "cell";
				if (i < 11) {
					pixels[i].id = "x" + (i % 11);
				} else {
					pixels[i].id = String.fromCharCode(i / 11 + 96) + (i % 11);
					if (player.name === "computer") {
						let id = String.fromCharCode(i / 11 + 96) + (i % 11);
						let y = Number(id.charCodeAt(0) - 96);
						let x = Number(id.slice(1));
						// console.log(x, y);
						if (!player.Gameboard.checkPlayed([x, y])) {
							pixels[i].addEventListener(
								"click",
								function (event) {
									sendAttack(event, players);
								}
							);
							pixels[i].addEventListener(
								"click",
								function (event) {
									computerAttack(players[1], players[0]);
								}
							);
						}
					}
				}
				pixels[i].style.flex = `1 1 ${
					100 / Math.sqrt(resolution) - 1
				}%`;
				container.appendChild(pixels[i]);
			}
			addCoordinate(player);
			addMissedShots(player);
			addHitShots(player);
			if (player.name === "player") {
				drawShip(player);
			}
		}
	}
}

function cleanGrid(player) {
	let container;
	if (player.name === "player") {
		container = document.querySelector(".player");
	} else {
		container = document.querySelector(".computer");
	}
	container.innerHTML = "";
}

function addCoordinate(player) {
	let container;

	if (player.name === "player") {
		container = document.querySelector(".player");
	} else {
		container = document.querySelector(".computer");
	}

	for (let i = 0; i < 11; i++) {
		let cell = container.querySelector("#x" + i);
		if (i > 0) {
			cell.textContent = i;
		}
	}

	for (let i = 0; i < 10; i++) {
		let cell = container.querySelector(
			"#" + String.fromCharCode(97 + i) + 0
		);
		cell.textContent = String.fromCharCode(97 + i);
	}
}

function addMissedShots(player) {
	let container = document.querySelector("." + player.name);
	for (let shot in player.Gameboard.missedShot) {
		let currentCoordinates = player.Gameboard.missedShot[shot];
		let cell = container.querySelector(
			"#" +
				String.fromCharCode(currentCoordinates[1] + 96) +
				currentCoordinates[0]
		);
		cell.classList.add("missed");
	}
}

function addHitShots(player) {
	let container = document.querySelector("." + player.name);

	for (let shot in player.Gameboard.hitShot) {
		let currentCoordinates = player.Gameboard.hitShot[shot];
		let cell = container.querySelector(
			"#" +
				String.fromCharCode(currentCoordinates[1] + 96) +
				currentCoordinates[0]
		);
		cell.classList.add("hit");
	}
}

function drawShip(player) {
	let gameboard = player.Gameboard;
	let fleet = [
		gameboard.carrier,
		gameboard.battleship,
		gameboard.cruiser,
		gameboard.submarine,
		gameboard.destroyer,
	];
	let container = document.querySelector(".player");

	for (let ship in fleet) {
		let currentShip = fleet[ship];
		for (let coordinates in currentShip.coordinates) {
			let currentCoordinates = currentShip.coordinates[coordinates];
			let cell = container.querySelector(
				"#" +
					String.fromCharCode(currentCoordinates[1] + 96) +
					currentCoordinates[0]
			);
			cell.classList.add("ship");
		}
	}
}

function sendAttack(event, players) {
	let player = players[1];
	let y = Number(event.target.id.charCodeAt(0) - 96);
	let x = Number(event.target.id.slice(1));

	player.Gameboard.receiveAttack(x, y);

	if (players[1].Gameboard.checkAllSunk()) {
		players[1].lost = true;
		announcement("computer");
		return;
	}
	if (!players[0].lost && !players[1].lost) {
		createGrids(players);
	}
}

function playerTurn() {
	let instructionBlock = document.querySelector(".instruction");
	instructionBlock.innerHTML = "Your Turn";
}

function computerTurn() {
	let instructionBlock = document.querySelector(".instruction");
	instructionBlock.innerHTML = "Computer is thinking...";
}

function computerAttack(computerPlayer, humanPlayer) {
	let alreadyPlayed = true;
	let x;
	let y;

	const computerDiv = document.querySelector(".computer");
	computerDiv.style.pointerEvents = "none";
	if (computerPlayer.lost === true || humanPlayer.lost === true) {
		return;
	}
	computerTurn();

	while (alreadyPlayed === true) {
		x = Math.floor(Math.random() * 10 + 1);
		y = Math.floor(Math.random() * 10 + 1);
		alreadyPlayed = humanPlayer.Gameboard.checkPlayed([x, y]);
	}

	humanPlayer.Gameboard.receiveAttack(x, y);

	sleep(100).then(() => {
		createGrids([humanPlayer, computerPlayer]);

		if (humanPlayer.Gameboard.checkAllSunk()) {
			humanPlayer.lost = true;
			announcement("human");

			return;
		}
		sleep(100).then(() => {
			if (humanPlayer.lost === true) {
				return;
			}
			playerTurn();

			computerDiv.style.pointerEvents = "auto";
		});
	});
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function announcement(loser) {
	document.querySelector(".player").innerHTML = "";
	document.querySelector(".computer").innerHTML = "";

	let instructionBlock = document.querySelector(".instruction");

	if (loser === "human") {
		instructionBlock.innerHTML = "You lost...";
	} else {
		instructionBlock.innerHTML = "You WIN!";
	}
}

export { createGrids, drawShip, playerTurn, computerTurn, announcement };
