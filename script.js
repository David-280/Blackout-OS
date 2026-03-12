document.addEventListener("DOMContentLoaded", () => {

  /* NAVIGATION */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navBackdrop = document.getElementById("navBackdrop");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      if (navBackdrop) navBackdrop.classList.toggle("active");
    });
  }

  function closeNav() {
    navLinks.classList.remove("active");
    if (navBackdrop) navBackdrop.classList.remove("active");
  }

  if (navBackdrop) navBackdrop.addEventListener("click", closeNav);

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeNav);
  });


  /* CUSTOM CURSOR SYSTEM */
  const glow = document.getElementById("cursorGlow");
  const osCursor = document.getElementById("osCursor");
  const archGrid = document.getElementById("archGrid");

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  let scale = 1;

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    if (glow) {
      glow.style.left = mouseX + "px";
      glow.style.top = mouseY + "px";
    }

    if (archGrid) {
      const x = mouseX / window.innerWidth;
      const y = mouseY / window.innerHeight;

      archGrid.style.opacity =
        0.55 + 0.25 * Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
    }
  });


  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.35;
    cursorY += (mouseY - cursorY) * 0.35;

    if (osCursor) {
      osCursor.style.transform =
        `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(${scale})`;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  /* CLICK EFFECT */
  document.addEventListener("mousedown", () => {
    scale = 0.85;
    if (osCursor)
      osCursor.style.filter = "drop-shadow(0 0 10px rgba(255,30,30,1))";
  });

  document.addEventListener("mouseup", () => {
    scale = 1;
    if (osCursor)
      osCursor.style.filter = "drop-shadow(0 0 6px rgba(0,245,255,0.8))";
  });


  /* HOVER EFFECT */
  document.querySelectorAll("a, button").forEach(el => {

    el.addEventListener("mouseenter", () => {
      scale = 1.2;
      if (osCursor)
        osCursor.style.filter = "drop-shadow(0 0 12px rgba(0,255,156,1))";
    });

    el.addEventListener("mouseleave", () => {
      scale = 1;
      if (osCursor)
        osCursor.style.filter = "drop-shadow(0 0 6px rgba(0,245,255,0.8))";
    });

  });


  /* COUNTERS */
  let threats = 1248;
  let servers = 320;

  const threatEl = document.getElementById("threatCount");
  const serverEl = document.getElementById("servers");

  setInterval(() => {

    threats += Math.floor(Math.random() * 3);
    servers += Math.random() > 0.97 ? 1 : 0;

    if (threatEl) threatEl.textContent = threats.toLocaleString();
    if (serverEl) serverEl.textContent = servers.toLocaleString();

  }, 1400);


  /* MODAL SYSTEM */
  const modal = document.getElementById("osModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.getElementById("closeModal");

  const modalContent = {
    system: {
      title: "SYSTEM OVERVIEW",
      body: "BLACKOUT / OS monitors, isolates and neutralizes hostile processes."
    },
    threats: {
      title: "ACTIVE THREATS",
      body: "Multiple hostile processes detected across nodes."
    },
    control: {
      title: "CONTROL PANEL",
      body: "Manual override and system lockdown tools."
    },
    enter: {
      title: "SYSTEM ENTRY",
      body: "All actions are logged and monitored."
    },
    core: {
      title: "CORE STATUS",
      body: "Primary core operating at 99.99% integrity."
    }
  };

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

  if (closeModal)
    closeModal.addEventListener("click", () => modal.classList.remove("active"));

  if (modal)
    modal.querySelector(".os-modal-backdrop")
      .addEventListener("click", () => modal.classList.remove("active"));

});
