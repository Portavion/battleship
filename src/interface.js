function createGrid(player) {
	const resolution = 121;
	let container;

	if (player.number === 1) {
		container = document.querySelector(".player");
	} else {
		container = document.querySelector(".opponent");
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
			if (player.number === 2) {
				let id = String.fromCharCode(i / 11 + 96) + (i % 11);
				let y = Number(id.charCodeAt(0) - 96);
				let x = Number(id.slice(1));
				// console.log(x, y);
				if (!player.Gameboard.checkPlayed([x, y])) {
					pixels[i].addEventListener("click", function (event) {
						sendAttack(event, player);
					});
				}
			}
		}
		pixels[i].style.flex = `1 1 ${100 / Math.sqrt(resolution) - 1}%`;
		container.appendChild(pixels[i]);
	}

	addCoordinate(player);
	addMissedShots(player);
	addHitShots(player);
}

function cleanGrid(player) {
	let container;
	if (player.number === 1) {
		container = document.querySelector(".player");
	} else {
		container = document.querySelector(".opponent");
	}
	container.innerHTML = "";
}

function addCoordinate(player) {
	let container;

	if (player.number === 1) {
		container = document.querySelector(".player");
	} else {
		container = document.querySelector(".opponent");
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
	let container = document.querySelector(".opponent");
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
	let container = document.querySelector(".opponent");

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

function sendAttack(event, player) {
	let y = Number(event.target.id.charCodeAt(0) - 96);
	let x = Number(event.target.id.slice(1));

	player.Gameboard.receiveAttack(x, y);

	createGrid(player);
	if (player.Gameboard.checkAllSunk()) {
		console.log("all sunk");
	}
}

export { createGrid, drawShip };
