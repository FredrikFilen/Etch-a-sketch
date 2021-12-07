const MOVE_AMOUNT = 15;

// Select the elements on the page
const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakebutton = document.querySelector(".shake");

// set up canvas
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;
ctx.globalCompositeOperation = "lighter";

const width = canvas.width;
const height = canvas.height;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//drawing
let hue = Math.random() * 360;
ctx.shadowBlur = 40;

function draw({ key }) {
  hue += 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;

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

// keystrokehandler
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

// clear
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

// listeners
window.addEventListener("keydown", handleKey);
shakebutton.addEventListener("click", clearCanvas);
