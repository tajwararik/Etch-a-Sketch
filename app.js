const button = document.querySelector("#button");
const RGBButton = document.querySelector("#rgb-color");
const darkenButton = document.querySelector("#darken-effect");
const reset = document.querySelector("#reset");
const container = document.querySelector(".container");

let n = 16; //Default grid size
let RGBMode = false; // RGB mode is off
let darkenEffect = false; // Darken effect mode if off
let darkenOpacity = 0;

//Clears previous grids to create new
function clearGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createGrid(num) {
  let totalSquares = num * num;

  for (let i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.style.width = `${600 / num}px`;
    square.style.height = `${600 / num}px`;
    square.style.border = "0.5px solid #000";
    container.appendChild(square);

    square.addEventListener("mouseover", draw);
  }
}

//Creates initial grid
document.addEventListener("DOMContentLoaded", () => createGrid(n));

//Creates RGB color
function getRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Draws while hovering the squares
function draw(e) {
  if (RGBMode) e.target.style.backgroundColor = getRGBColor();
  else if (darkenEffect) {
    darkenOpacity += 0.1;
    if (darkenOpacity >= 1) darkenOpacity = 0;
    e.target.style.backgroundColor = `rgba(0, 0, 0, ${darkenOpacity})`;
  } else e.target.style.backgroundColor = "#000";
}

button.addEventListener("click", () => {
  n = Number(prompt("Enter an integer between 2 to 100: "));

  if (n < 2 || n > 100 || isNaN(n) || !Number.isInteger(n))
    alert("Please enter a valid integer");
  else {
    clearGrid();
    createGrid(n);
  }
});

RGBButton.addEventListener("click", () => {
  RGBMode = !RGBMode;
  if (RGBMode) {
    RGBButton.textContent = "RGB mode on";
    darkenEffect = false; // Turn of darken effect
    darkenButton.textContent = "Darken effect off";
  } else RGBButton.textContent = "RGB mode off";
});

darkenButton.addEventListener("click", () => {
  darkenEffect = !darkenEffect;
  if (darkenEffect) {
    darkenButton.textContent = "Darken effect on";
    RGBMode = false; // Turn off RGB mode
    RGBButton.textContent = "RGB button off";
  } else darkenButton.textContent = "Darken effect off";
});

reset.addEventListener("click", () => {
  clearGrid();
  RGBMode = false;
  darkenEffect = false;
  darkenOpacity = 0;
  RGBButton.textContent = "RGB mode off";
  darkenButton.textContent = "Darken effect off";
  createGrid(16); // Reset back to 16 * 16 grid
});
