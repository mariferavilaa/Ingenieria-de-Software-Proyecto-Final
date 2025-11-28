document.addEventListener("DOMContentLoaded", () => {
  // ---- Deletion confirmation overlay (shared across pages) ----
  const overlay = document.getElementById("overlay-confirm");
  const confirmNameEl = document.getElementById("confirm-patient-name");

  // Check if a deletion was triggered from info.js
  const pendingDeletion = sessionStorage.getItem("pendingDeletion");
  if (pendingDeletion) {
    const data = JSON.parse(pendingDeletion);
    if (confirmNameEl) confirmNameEl.textContent = data.patientName;
    if (overlay) {
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
      // Auto-hide after 8 seconds
      setTimeout(() => {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
      }, 8000);
    }
    // Clear the flag
    sessionStorage.removeItem("pendingDeletion");
  }

  const userRole = localStorage.getItem("userRole");

  const navLeft = document.getElementById("nav-left");
  const navCenter = document.getElementById("nav-center");
  const navRight = document.getElementById("nav-right");

  // ---- LEFT: ALWAYS visible ----
  navLeft.innerHTML = `<a href="main.html"><img src="./images/logo.png" alt="Logo" class="nav-logo"></a>`;

  // ---- RIGHT: ALWAYS visible ---- <a> for easier testing. Lead to account settings
  navRight.innerHTML = `<a href="login.html"><img width="40" height="40" src="./images/user-icon.png" alt="cuenta" class="nav-account"></a>`;

  // helper to mark active button
  function setActiveButton(mode) {
    const btnP = document.getElementById("btnPacientes");
    const btnR = document.getElementById("btnPersonal");
    if (!btnP || !btnR) return;

    btnP.classList.toggle("active", mode === "pacientes");
    btnR.classList.toggle("active", mode === "personal");
  }

  // ---- CENTER: only for admin ----
  if (userRole === "3") {
    navCenter.innerHTML = `
      <button id="btnPacientes" class="nav-btn">Pacientes</button>
      <button id="btnPersonal" class="nav-btn">Personal</button>
    `;

    const btnPac = document.getElementById("btnPacientes");
    const btnPer = document.getElementById("btnPersonal");

    // Read current mode from localStorage (default to "pacientes")
    const currentMode = localStorage.getItem("mainMode") || "pacientes";
    setActiveButton(currentMode);

    // When clicked, set mode, show active state, then redirect
    btnPac.addEventListener("click", () => {
      localStorage.setItem("mainMode", "pacientes");
      setActiveButton("pacientes");
      window.location.href = "main.html";
    });

    btnPer.addEventListener("click", () => {
      localStorage.setItem("mainMode", "personal");
      setActiveButton("personal");
      window.location.href = "main.html";
    });
  } else {
    // ensure center is empty for non-admins
    navCenter.innerHTML = "";
  }
});

// to show the confirmation sended by another page
document.addEventListener('DOMContentLoaded', (event) => {
    // Check if a message exists in localStorage
    const storedMessage = localStorage.getItem('deleteMessage');

    if (storedMessage) {
        // Parse the string back into a JavaScript object
        const messageData = JSON.parse(storedMessage);
        const container = document.querySelector('.page-container');

        if (container) {
            const msg = document.createElement('div');
            msg.className = messageData.className;
            msg.textContent = messageData.text;
            container.insertBefore(msg, container.firstChild);
        }
        
        // Clean up localStorage so the message doesn't reappear on other visits/refreshes
        localStorage.removeItem('deleteMessage');
    }
});