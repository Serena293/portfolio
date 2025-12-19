// Plane control
const plane = document.getElementById("plane-svg");
let isActive = false,
  x = 0,
  y = 0,
  angle = 0;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
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
  isActive = false;
  x = 0;
  y = 0;
  angle = 0;
  plane.style.transform = "none";
});

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

// GSAP Welcome Text
const welcomeText = document.querySelector(".welcome-text");
if (!welcomeText.classList.contains("is-split")) {
  const letters = welcomeText.textContent.split("");
  welcomeText.textContent = "";
  letters.forEach((letter) => {
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
  onComplete: startRolesAnimation,
});

// GSAP TextPlugin Roles
gsap.registerPlugin(TextPlugin);

const roles = document.querySelectorAll(".hero-role");
roles.forEach((role) => (role.style.opacity = 1));
roles.forEach((role) => (role.textContent = ""));

function startRolesAnimation() {
  let current = 0;
  function typeRole() {
    const role = roles[current];
    const text =
      role.textContent || role.getAttribute("data-text") || role.textContent;

    role.textContent = "";

    const tl = gsap.timeline({
      onComplete: () => {
        current = (current + 1) % roles.length;
        typeRole();
      },
    });

    tl.to(role, {
      text: role.getAttribute("data-text") || role.textContent,
      duration: 0.8 * 5,
      ease: "none",
    })
      .to({}, { duration: 1 })
      .to(role, { text: "", duration: 0.5, ease: "none" });
  }
  typeRole();
}

// GSAP panel animations
document.addEventListener("DOMContentLoaded", function () {
  const pillarBtns = document.querySelectorAll(".pillar-btn");
  const pillarContents = document.querySelectorAll(".pillar-content");

  gsap.set(".pillar-content", { height: 0, opacity: 0 });

  pillarBtns.forEach((btn) => btn.classList.remove("active"));

  pillarBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      const targetContent = document.getElementById(`${target}-content`);
      const isActive = this.classList.contains("active");

      if (isActive) {
        gsap.to(targetContent, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            targetContent.classList.remove("active");
          },
        });

        this.classList.remove("active");
        return;
      }

      pillarBtns.forEach((b) => b.classList.remove("active"));
      pillarContents.forEach((content) => {
        if (content !== targetContent) {
          content.classList.remove("active");
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      });

      this.classList.add("active");

      gsap.to(targetContent, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onStart: () => {
          targetContent.classList.add("active");
        },
        onComplete: () => {
          gsap.from(
            targetContent.querySelectorAll(".content-item, p, .content-link"),
            {
              y: 15,
              opacity: 0,
              stagger: 0.05,
              duration: 0.3,
              ease: "back.out(1.2)",
            }
          );
        },
      });
    });
  });
});

// Curve animation
document.addEventListener("DOMContentLoaded", () => {
  const showBtn = document.getElementById("show-pillar");
  const closeBtn = document.querySelector(".close-section-btn");
  const pillarSection = document.querySelector(".pillar-section");

  if (!pillarSection || !showBtn) return;

  let isPillarOpen = false;


  gsap.set(pillarSection, {
    opacity: 0,
    y: 60,
    pointerEvents: "none"
  });

  function openPillar() {
    if (isPillarOpen) return;
    isPillarOpen = true;

    gsap.killTweensOf(pillarSection);

    gsap.fromTo(
      pillarSection,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        pointerEvents: "auto"
      }
    );

    gsap.to(showBtn, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => (showBtn.style.display = "none")
    });
  }

  function closePillar() {
    if (!isPillarOpen) return;
    isPillarOpen = false;

    document.querySelectorAll(".pillar-content.active").forEach(c => {
      c.classList.remove("active");
      gsap.to(c, { height: 0, opacity: 0, duration: 0.3 });
    });

    document.querySelectorAll(".pillar-btn.active")
      .forEach(b => b.classList.remove("active"));

    gsap.killTweensOf(pillarSection);

    gsap.to(pillarSection, {
      opacity: 0,
      y: 60,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        pillarSection.style.pointerEvents = "none";
        showBtn.style.display = "block";
        gsap.to(showBtn, { opacity: 1, duration: 0.3 });
      }
    });
  }

  showBtn.addEventListener("click", openPillar);

  if (closeBtn) {
    closeBtn.addEventListener("click", closePillar);
  }
});


const certButtons = document.querySelectorAll(".view-cert-btn");
const modal = document.getElementById("certModal");
const modalClose = document.querySelector(".modal-close");
const certDetail = document.getElementById("certDetail");


const certifications = {
  fullstack: '<img src="./assets/img/epicode-certificazione.jpg" alt="FullStack Developer Cert" style="max-width:100%; border-radius:8px;"><p>FullStack Developer — Epicode<br>2025 · Web Development</p>',
  frontend: '<img src="./assets/img/mayerfeld-frontend.jpg" alt="Frontend Developer Cert" style="max-width:100%; border-radius:8px;"><p>Frontend Developer — Mayerfeld<br>2025 · Frontend Development</p>',
};


certButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const certId = btn.getAttribute("data-cert");
    certDetail.innerHTML = certifications[certId] || "Certificazione non trovata.";
    modal.style.display = "block";
  });
});


modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
