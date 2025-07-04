const plane = document.getElementById("plane-svg");
let isActive = false;
let x = 0;
let y = 0;
let angle = 0;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// CLICK: attiva movimento e colore
plane.addEventListener("click", () => {
  isActive = true;
  plane.classList.add("control"); // ferma animazione CSS
  const toggled = plane.classList.toggle("color");
  plane.style.fill = toggled ? getRandomColor() : "none";
  plane.focus();
});

// DOPPIO CLICK: resetta tutto
plane.addEventListener("dblclick", () => {
  plane.style.fill = "none";
  plane.classList.remove("color");
  plane.classList.remove("control");
  isActive = false;
  x = 0;
  y = 0;
  angle = 0;
  plane.style.transform = "none";
});

// Movimento con frecce
document.addEventListener("keydown", (e) => {
  if (!isActive) return;

  switch (e.key) {
    case "ArrowUp":
      y -= 10;
      angle = -90;
      break;
    case "ArrowDown":
      y += 10;
      angle = 90;
      break;
    case "ArrowLeft":
      x -= 10;
      angle = 180;
      break;
    case "ArrowRight":
      x += 10;
      angle = 0;
      break;
  }

  plane.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
});
