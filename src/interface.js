function createGrid() {
	const resolution = 121;
	let container = document.querySelector(".player");
	let pixels = [];
	cleanGrid();
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
	addCoordinate();
}

function cleanGrid() {
	let container = document.querySelector(".player");
	container.innerHTML = "";
}

function addCoordinate() {
	let container = document.querySelector(".player");

	for (let i = 0; i < 11; i++) {
		let cell = document.querySelector("#x" + i);
		if (i > 0) {
			cell.textContent = i;
		}
	}

	for (let i = 0; i < 10; i++) {
		let cell = document.querySelector(
			"#" + String.fromCharCode(97 + i) + 0
		);
		cell.textContent = String.fromCharCode(97 + i);
	}
}

export { createGrid };
