function createGrid(player) {
	const resolution = 121;
	let container;

	if (player.playerType === "human") {
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
		}
		pixels[i].style.flex = `1 1 ${100 / Math.sqrt(resolution) - 1}%`;

		container.appendChild(pixels[i]);
	}
	addCoordinate(player);
}

function cleanGrid(player) {
	let container;
	if (player.playerType === "human") {
		container = document.querySelector(".player");
	} else {
		container = document.querySelector(".opponent");
	}
	container.innerHTML = "";
}

function addCoordinate(player) {
	let container;

	if (player.playerType === "human") {
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

export { createGrid };
