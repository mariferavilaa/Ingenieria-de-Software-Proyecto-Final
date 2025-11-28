document.addEventListener('DOMContentLoaded', () => {
  const userRole = localStorage.getItem('userRole');
  const deleteBtn = document.querySelector('.delete-btn');
  const editBtn = document.querySelector('.edit-btn');

  // Show Delete and Edit buttons only for médico and administrador
  if (userRole === '1' || userRole === '3') {
    if (deleteBtn) deleteBtn.style.display = '';
    if (editBtn) editBtn.style.display = '';
  } else {
    if (deleteBtn) deleteBtn.style.display = 'none';
    if (editBtn) editBtn.style.display = 'none';
  }

  // Sample lists for prototype
  const historial = {
    alergias: ['Penicilina', 'Aspirina'],
    enfermedades_hereditarias: ['Diabetes tipo 2'],
    habitos: ['Fuma ocasionalmente', 'Consume alcohol socialmente'],
    toxicamia: ['Ninguna conocida'],
    vacunas: ['SRP (2020)', 'Influenza (2024)'],
    enfermedades: ['Hipertensión arterial'],
    antecedentes_quirurgicos: ['Apendicectomía (2010)'],
    antecedentes_traumaticos: ['Fractura tibia (2015)'],
    condicion_vivienda: 'Vivienda propia, 3 habitaciones, acceso a agua potable y servicios básicos.'
  };

  function renderList(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!items || items.length === 0) {
      el.innerHTML = '<div class="empty-list"></div>';
      return;
    }
    el.innerHTML = items.map(i => `<div class="hist-item">${i}</div>`).join('');
  }

  renderList('alergias-list', historial.alergias);
  renderList('hereditarias-list', historial.enfermedades_hereditarias);
  renderList('habitos-list', historial.habitos);
  renderList('toxicamia-list', historial.toxicamia);
  renderList('vacunas-list', historial.vacunas);
  renderList('enfermedades-list', historial.enfermedades);
  renderList('quirurgicos-list', historial.antecedentes_quirurgicos);
  renderList('traumaticos-list', historial.antecedentes_traumaticos);

  const viviendaEl = document.getElementById('condicion-vivienda');
  if (viviendaEl) viviendaEl.textContent = historial.condicion_vivienda || '-';

  const overlay = document.getElementById('overlay-confirm');
  const confirmNameEl = document.getElementById('confirm-patient-name');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

  function showOverlay() {
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
      if (confirmNameEl) confirmNameEl.textContent = 'Historial médico';
    }
  }

  function hideOverlay() {
    if (overlay) {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
    }
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showOverlay();
    });
  }

  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      hideOverlay();
    });
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // hide then redirect to info-patients.html
      hideOverlay();
      localStorage.setItem('deleteMessage', JSON.stringify({
        text: `Historial médico dado de baja.`,
        className: 'delete-success'
      }));
      window.location.href = 'info-patients.html';
    });
  }

  if (editBtn) editBtn.addEventListener('click', () => {
    sessionStorage.setItem('editHistorialMode', 'true');
    window.location.href = 'edit-historial-medico.html';
  });
});
