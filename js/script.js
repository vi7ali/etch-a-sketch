const container = document.querySelector("#container");
const newButton = document.querySelector("#bnew");
const randomColorOption = document.querySelector("#random-color");
const darkerColorOption = document.querySelector("#darker-color");
const blackColorOption = document.querySelector("#black-color");
const containerPosition = container.getBoundingClientRect();
const sideMax = containerPosition.width;

createGrid(16);

newButton.addEventListener("click", getNewGrid);

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
	else createGrid(uInput);
}

function createGrid(cellsTotal) {
	clearGrid();
	container.style.gridTemplate = `repeat(${cellsTotal}, 1fr) / repeat(${cellsTotal}, 1fr)`;
	for (i=0; i<cellsTotal*cellsTotal; i++) {
		let cell = document.createElement("div");
		cell.classList.add("cell");
		cell.setAttribute("data-passes", "0"); // This attribute will help with the calculations to make the cell totally black after exactly 10 passes
		cell.addEventListener("mouseover", changeColor);
		container.appendChild(cell);
	}	
}

function clearGrid() {
	let allCells = document.querySelectorAll(".cell");
	allCells.forEach((cell) => cell.remove());
}

function changeColor(e) 
{
	let cell = e.target;
	let currentColor = cell.style.backgroundColor;
	let numberOfPasses = cell.getAttribute("data-passes");
	let color = randomPaint();

	if(blackColorOption.checked) {
		cell.style.backgroundColor = `rgb(0, 0, 0)`;
		cell.setAttribute("data-passes", "1")
	}
	else if(randomColorOption.checked || (darkerColorOption.checked && numberOfPasses==0)) {
		cell.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
		cell.setAttribute("data-passes", "1");
	}
	else if(darkerColorOption.checked) {
		let darkerColor = currentColor.slice(4, currentColor.length-1);
		darkerColor = darkerColor.split(",");

		for(i=0;i<darkerColor.length;i++)	{
			let originalPercent = ((darkerColor[i] * 100)/(100 - (numberOfPasses-1) * 10))*0.1; // 10% of the original value using reverse percentage formula
			darkerColor[i] = darkerColor[i] - originalPercent;
		}
		cell.style.backgroundColor = `rgb(${darkerColor.join()})`;	
		if(numberOfPasses<10) {
			numberOfPasses++;
			cell.setAttribute("data-passes", numberOfPasses);
		}
	}
}

function randomPaint() {
	let color = [];
	for (i=0; i<3;i++) {
		color[i] = Math.floor(Math.random()*256);	
	}
	return color;
}