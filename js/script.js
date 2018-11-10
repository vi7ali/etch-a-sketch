const container = document.querySelector("#container");
const newButton = document.querySelector("#bnew");
const clearButton = document.querySelector("#clear");
const containerPosition = container.getBoundingClientRect();
const sideMax = containerPosition.width;

createGrid(16);

newButton.addEventListener("click", getNewGrid);
clearButton.addEventListener("click", clearGrid);

function createGrid(cellsTotal) {
	clearGrid();
	for (i=0; i<cellsTotal*cellsTotal; i++) {
		let cell = document.createElement("div");
		cell.addEventListener("mouseover", changeColor)
		cell.classList.add("cell");
		cell.style.width = Math.round((sideMax / cellsTotal)*100) / 100 + "px";
		cell.style.height = Math.round((sideMax / cellsTotal)*100) / 100 + "px";
		container.appendChild(cell);
	}	
}

function clearGrid() {
	let allCells = document.querySelectorAll(".cell");
	allCells.forEach((cell) => cell.remove());
}

function changeColor(e) {
	let currentCell = e.target;
	if(currentCell.classList.contains("painted")) {
		currentCell.style.backgroundColor = addBlack(currentCell);
	}
	else {
	 currentCell.classList.add("painted");
	 currentCell.style.backgroundColor = randomPaint();
	}
}

function addBlack(cell) {

	let currentColor = cell.style.backgroundColor;
	let tempString = currentColor.replace("rgb(", "");
	tempString = tempString.replace(")", "");
	let newColor = tempString.split(",");

	for(i=0;i<newColor.length;i++) {
		newColor[i] = newColor[i] * 0.90;
	}
	return `rgb(${newColor.join()})`;
}

function getNewGrid() {
	var uInput = prompt("Please enter the number of cells between 1 and 64");
	uInput = Number(uInput);
	if(isNaN(uInput)) {
		alert("Invalid input, it must be a number");
		return;
	}
	else if(uInput<1 || uInput>64) {
		alert("Invalid number. It must be between 1 and 64");
		return;
	}
	else {
		createGrid(uInput);
	}
}

function randomPaint() {
	let r = Math.floor(Math.random()*(256));
	let g = Math.floor(Math.random()*(256));
	let b = Math.floor(Math.random()*(256));
	
	return `rgb(${r}, ${g}, ${b})`;
}