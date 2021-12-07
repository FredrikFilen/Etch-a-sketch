const MOVE_AMOUNT = 10;

// Select the elements on the page - canvas, shake button
const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakebutton = document.querySelector(".shake");

// set up our canvas for drawing
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

const width = canvas.width;
const height = canvas.height;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
let hue = Math.random() * 360;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

function draw({ key }) {
  hue += 5;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);

  switch (key) {
    case "ArrowUp":
      y = y - MOVE_AMOUNT;
      break;

    case "ArrowDown":
      y = y + MOVE_AMOUNT;
      break;

    case "ArrowLeft":
      x = x - MOVE_AMOUNT;
      break;

    case "ArrowRight":
      x = x + MOVE_AMOUNT;
      break;

    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

// write a handler for the keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }

  if (e.key === " ") {
    e.preventDefault();
    clearCanvas();
  }
}

// clear or shake function
function clearCanvas() {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    function () {
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}

// listen for arrow keys
window.addEventListener("keydown", handleKey);
shakebutton.addEventListener("click", clearCanvas);
