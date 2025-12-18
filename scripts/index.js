// Plane control
const plane = document.getElementById("plane-svg");
let isActive = false, x = 0, y = 0, angle = 0;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) { color += letters[Math.floor(Math.random() * 16)]; }
  return color;
};

plane.addEventListener("click", () => {
  isActive = true;
  plane.classList.add("control");
  const toggled = plane.classList.toggle("color");
  plane.style.fill = toggled ? getRandomColor() : "none";
  plane.focus();
});

plane.addEventListener("dblclick", () => {
  plane.style.fill = "none";
  plane.classList.remove("color");
  plane.classList.remove("control");
  isActive = false; x = 0; y = 0; angle = 0;
  plane.style.transform = "none";
});

document.addEventListener("keydown", (e) => {
  if (!isActive) return;
  switch (e.key) {
    case "ArrowUp": y -= 10; angle = -90; break;
    case "ArrowDown": y += 10; angle = 90; break;
    case "ArrowLeft": x -= 10; angle = 180; break;
    case "ArrowRight": x += 10; angle = 0; break;
  }
  plane.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
});

// GSAP Welcome Text
const welcomeText = document.querySelector(".welcome-text");
if (!welcomeText.classList.contains("is-split")) {
  const letters = welcomeText.textContent.split("");
  welcomeText.textContent = "";
  letters.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    welcomeText.appendChild(span);
  });
  welcomeText.classList.add("is-split");
}

gsap.from(".welcome-text span", {
  x: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.05,
  ease: "power2.out",
  onComplete: startRolesAnimation 
});

// GSAP TextPlugin Roles
gsap.registerPlugin(TextPlugin);

const roles = document.querySelectorAll(".hero-role");
roles.forEach(role => role.style.opacity = 1); 
roles.forEach(role => role.textContent = "");

function startRolesAnimation() {
  let current = 0;
  function typeRole() {
    const role = roles[current];
    const text = role.textContent || role.getAttribute("data-text") || role.textContent;

    role.textContent = "";

    const tl = gsap.timeline({
      onComplete: () => {
        current = (current + 1) % roles.length;
        typeRole(); 
      }
    });

    tl.to(role, { text: role.getAttribute("data-text") || role.textContent, duration: 0.8 * 5, ease: "none" })
      .to({}, { duration: 1 }) 
      .to(role, { text: "", duration: 0.5, ease: "none" });
  }
  typeRole();
}
