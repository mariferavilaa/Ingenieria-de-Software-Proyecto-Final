document.addEventListener('DOMContentLoaded', () => {
  const userRole = localStorage.getItem('userRole');
  const form = document.getElementById('historial-form');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');

  // containers and add buttons mapping
  const lists = [
    { key: 'alergias', containerId: 'alergias-container', addBtnId: 'add-alergia' },
    { key: 'hereditarias', containerId: 'hereditarias-container', addBtnId: 'add-hereditaria' },
    { key: 'habitos', containerId: 'habitos-container', addBtnId: 'add-habito' },
    { key: 'toxicamia', containerId: 'toxicamia-container', addBtnId: 'add-toxicamia' },
    { key: 'vacunas', containerId: 'vacunas-container', addBtnId: 'add-vacuna' },
    { key: 'enfermedades', containerId: 'enfermedades-container', addBtnId: 'add-enfermedad' },
    { key: 'quirurgicos', containerId: 'quirurgicos-container', addBtnId: 'add-quirurgico' },
    { key: 'traumaticos', containerId: 'traumaticos-container', addBtnId: 'add-traumatico' }
  ];

  // Hide form for Farmacéutico (role 2)
  if (userRole === '2') {
    if (form) form.style.display = 'none';
  }

  // Sample data used when editing
  const sample = {
    alergias: ['Penicilina', 'Aspirina'],
    hereditarias: ['Diabetes tipo 2'],
    habitos: ['Fuma ocasionalmente'],
    toxicamia: ['Ninguna conocida'],
    vacunas: ['SRP (2020)', 'Influenza (2024)'],
    enfermedades: ['Hipertensión arterial'],
    quirurgicos: ['Apendicectomía (2010)'],
    traumaticos: ['Fractura tibia (2015)'],
    condicion_vivienda: 'Vivienda propia, 3 habitaciones, acceso a agua potable.'
  };

  // Utility: create an input row for a given value
  function createRow(value = '') {
    const row = document.createElement('div');
    row.className = 'row-group';
    row.style.marginBottom = '8px';
    row.innerHTML = `
      <p style="flex:1 1 80%; margin:0"><input type="text" value="${value || ''}" class="hist-input"/></p>
      <button type="button" class="btn-delete-hist" style="flex:0 0 auto; padding:8px 10px; background:#ff6b6b; color:#fff; border:none; border-radius:6px; cursor:pointer">✕</button>
    `;
    row.querySelector('.btn-delete-hist').addEventListener('click', (e) => { e.preventDefault(); row.remove(); });
    return row;
  }

  // Add handlers to add buttons
  lists.forEach(l => {
    const container = document.getElementById(l.containerId);
    const addBtn = document.getElementById(l.addBtnId);
    if (!container || !addBtn) return;
    addBtn.addEventListener('click', (e) => { e.preventDefault(); container.appendChild(createRow()); });
  });

  // If edit mode, show with sample rows
  const isEditing = sessionStorage.getItem('editHistorialMode') === 'true';
  if (isEditing) {
    lists.forEach(l => {
      const items = sample[l.key] || [];
      const container = document.getElementById(l.containerId);
      if (!container) return;
      items.forEach(it => container.appendChild(createRow(it)));
    });
    const viviendaEl = document.getElementById('condicion-vivienda');
    if (viviendaEl) viviendaEl.value = sample.condicion_vivienda || '';
    sessionStorage.removeItem('editHistorialMode');
  }

  // Cancel -> go back to historial page when creating or editing
  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'historial-medico.html';
  });

  // Confirm -> no save in prototype, just redirect back
  confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'historial-medico.html';
  });
});
