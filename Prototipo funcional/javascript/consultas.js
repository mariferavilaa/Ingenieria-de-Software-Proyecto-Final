document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('consultas-title');
  const listContainer = document.getElementById('consultas-list');
  const searchInput = document.getElementById('consulta-search');
  const addBtn = document.getElementById('btn-add-consulta');

  const userRole = localStorage.getItem('userRole');
  // Show add button for Médico (1) and Administrador (3)
  if (userRole === '1' || userRole === '3') addBtn.classList.remove('hidden');

  // Prototype data source
  const consultas = [
    {date:'09/11/2025', medico:'Dr. Alejandro Pérez', estado:'Atendido', hora:'09:30', razon:'Chequeo general'},
    {date:'09/11/2025', medico:'Dra. Laura Ortega', estado:'No atendida', hora:'11:00', razon:'Control de laboratorio'},
    {date:'10/11/2025', medico:'Dr. Mario Sánchez', estado:'Atendido', hora:'14:15', razon:'Dolor abdominal'},
    {date:'11/11/2025', medico:'Dra. Alejandra Ruiz', estado:'Atendido', hora:'08:45', razon:'Consulta de rutina'}
  ];

  function renderConsultas(list) {
    title.textContent = 'Consultas';
    listContainer.innerHTML = list.map(c => `
      <div class="consulta-card" onclick="infoConsulta()">
        <small class="consulta-date">Consulta ${c.date}</small>
        <div class="consulta-top-row">
          <span><b>Médico:</b> ${c.medico}</span>
          <span style="margin-left:auto"><b>Estado:</b> ${c.estado}</span>
          <span><b>Hora:</b> ${c.hora}</span>
        </div>
        <div class="consulta-razon"><b>Razón:</b> ${c.razon}</div>
      </div>
    `).join('');
  }

  // Initial render
  renderConsultas(consultas);

  // Filter by date
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim();
    if (!q) renderConsultas(consultas);
    else {
      const filtered = consultas.filter(c => c.date.includes(q));
      renderConsultas(filtered);
    }
  });
});

function infoConsulta() {
  window.location.href = 'info-consulta.html';
}

function addNewConsulta() {
  sessionStorage.removeItem('editConsultaMode');
  window.location.href = 'edit-consulta.html';
}
