document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('consultas-title');
  const listContainer = document.getElementById('consultas-list');
  const searchInput = document.getElementById('consulta-search');
  const addBtn = document.getElementById('btn-add-consulta');

  const userRole = localStorage.getItem('userRole');
  // Show add button for Médico (1) and Administrador (3)
  if (userRole === '1' || userRole === '3') addBtn.classList.remove('hidden');

  // Prototype data source
  const estudios = [
    {id:1, estudio:'Radiografía de Tórax', consulta:'09/11/2025', tipo_estudio:'Imagenología', fecha:'09/11/2025'},
    {id:2, estudio:'Análisis de Sangre', consulta:'09/11/2025', tipo_estudio:'Laboratorio', fecha:'10/11/2025'},
    {id:3, estudio:'Electrocardiograma', consulta:'10/11/2025', tipo_estudio:'Cardiología', fecha:'11/11/2025'},
    {id:4, estudio:'Resonancia Magnética', consulta:'11/11/2025', tipo_estudio:'Imagenología', fecha:'12/11/2025'}
  ];

  function renderEstudios(list) {
    title.textContent = 'Estudios';
    listContainer.innerHTML = list.map(e => `
      <div class="consulta-card" onclick="infoEstudio(${e.id})">
        <small class="consulta-date">Estudio: ${e.estudio} | Consulta: ${e.consulta}</small>
        <div class="consulta-top-row">
          <span><b>Tipo de estudio:</b> ${e.tipo_estudio}</span>
          <span style="margin-left:auto"><b>Fecha:</b> ${e.fecha}</span>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderEstudios(estudios);

  // Filter by fecha
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim();
    if (!q) renderEstudios(estudios);
    else {
      const filtered = estudios.filter(e => e.fecha.includes(q));
      renderEstudios(filtered);
    }
  });
});

function infoEstudio(id) {
  sessionStorage.setItem('currentEstudio', id);
  window.location.href = 'info-estudio.html';
}

function addNewEstudio() {
  sessionStorage.removeItem('editEstudioMode');
  window.location.href = 'edit-estudio.html';
}
