document.addEventListener("DOMContentLoaded", () => {

// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Cursor Glow
const glow = document.getElementById("cursorGlow");
const osCursor = document.getElementById("osCursor");
const archGrid = document.getElementById("archGrid");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  glow.style.left = mouseX + "px";
  glow.style.top = mouseY + "px";
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.35;
  cursorY += (mouseY - cursorY) * 0.35;

  osCursor.style.left = cursorX + "px";
  osCursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();


// Grid reacts to cursor
const archGrid = document.getElementById("archGrid");
document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  archGrid.style.opacity = 0.35 + 0.25 * Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
});
document.addEventListener("mousedown", () => {
  osCursor.style.transform = "translate(-50%, -50%) scale(0.85)";
  osCursor.style.filter = "drop-shadow(0 0 10px rgba(255,30,30,1))";
});

document.addEventListener("mouseup", () => {
  osCursor.style.transform = "translate(-50%, -50%) scale(1)";
  osCursor.style.filter = "drop-shadow(0 0 6px rgba(0,245,255,0.8))";
});

// Threats / Servers Counter
let threats = 1248;
let servers = 320;
const threatEl = document.getElementById("threats");
const serverEl = document.getElementById("servers");
setInterval(() => {
  threats += Math.floor(Math.random() * 3);
  servers += Math.random() > 0.97 ? 1 : 0;
  threatEl.textContent = threats.toLocaleString();
  serverEl.textContent = servers.toLocaleString();
}, 1400);
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    osCursor.style.filter = "drop-shadow(0 0 12px rgba(0,255,156,1))";
    osCursor.style.transform = "translate(-50%, -50%) scale(1.2)";
  });

  el.addEventListener("mouseleave", () => {
    osCursor.style.filter = "drop-shadow(0 0 6px rgba(0,245,255,0.8))";
    osCursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});const modal = document.getElementById("osModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const modalContent = {
  system: {
    title: "SYSTEM OVERVIEW",
    body: `
      BLACKOUT / OS is a classified digital control interface
      designed for threat detection, isolation, and response.
      <br><br>
      <strong>Status:</strong> Operational<br>
      <strong>Clearance:</strong> Level 7 Required
    `
  },

  threats: {
    title: "ACTIVE THREATS",
    body: `
      Multiple hostile processes detected across distributed nodes.
      <br><br>
      <strong>Current Level:</strong> MAXIMUM<br>
      <strong>Auto-Neutralization:</strong> ENABLED
    `
  },

  control: {
    title: "CONTROL PANEL",
    body: `
      Manual system override interface.
      <br><br>
      Authorized operators may initiate lockdown,
      isolate nodes, or deploy countermeasures.
    `
  },

  enter: {
    title: "ACCESS REQUEST",
    body: `
      You are attempting to enter a restricted system layer.
      <br><br>
      All actions are monitored and logged.
      <br><br>
      <span class="red">Proceed with caution.</span>
    `
  },

  core: {
    title: "CORE STATUS",
    body: `
      Primary core is running within safe operational parameters.
      <br><br>
      <strong>Load:</strong> 42%<br>
      <strong>Integrity:</strong> 99.99%
    `
  }
};

// OPEN MODAL
document.querySelectorAll("[data-modal]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();

    const key = el.dataset.modal;
    const data = modalContent[key];

    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    modal.classList.add("active");
  });
});

// CLOSE MODAL
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.querySelector(".os-modal-backdrop")
  .addEventListener("click", () => {
    modal.classList.remove("active");
  });

// ESC KEY CLOSE
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});


