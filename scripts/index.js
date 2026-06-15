const plane = document.getElementById("plane-control");
const menuButton = document.getElementById("toggle-btn");
const navigationLinks = document.getElementById("links-nav");

if (menuButton && navigationLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigationLinks.classList.contains("show");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

if (plane) {
  let isActive = false;
  let x = 0;
  let y = 0;
  let angle = 0;

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue} 78% 58%)`;
  };

  const updatePlanePosition = () => {
    plane.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
  };

  const resetPlane = () => {
    isActive = false;
    x = 0;
    y = 0;
    angle = 0;
    plane.style.removeProperty("--plane-fill");
    plane.style.color = "";
    plane.style.transform = "";
    plane.classList.remove("is-active");
    plane.setAttribute("aria-pressed", "false");
  };

  plane.addEventListener("click", () => {
    isActive = true;
    const color = getRandomColor();

    plane.style.color = color;
    plane.style.setProperty("--plane-fill", color);
    plane.classList.add("is-active");
    plane.setAttribute("aria-pressed", "true");
  });

  plane.addEventListener("dblclick", resetPlane);

  plane.addEventListener("keydown", (event) => {
    if (!isActive) return;

    const movement = {
      ArrowUp: [0, -12, -90],
      ArrowDown: [0, 12, 90],
      ArrowLeft: [-12, 0, 180],
      ArrowRight: [12, 0, 0],
    };

    if (!movement[event.key]) return;

    event.preventDefault();
    const [deltaX, deltaY, nextAngle] = movement[event.key];
    x += deltaX;
    y += deltaY;
    angle = nextAngle;
    updatePlanePosition();
  });

  plane.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      resetPlane();
    }
  });
}
