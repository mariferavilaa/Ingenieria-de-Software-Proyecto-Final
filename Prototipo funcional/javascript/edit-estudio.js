document.addEventListener('DOMContentLoaded', () => {
  const userRole = localStorage.getItem('userRole');
  const form = document.getElementById('estudio-form');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');
  const imagenesCcontainer = document.getElementById('imagenes-container');
  const addImagenBtn = document.getElementById('add-imagen');

  // Sample data for editing
  const sample = {
    id_cita: 'C001',
    id_estudio: 'EST001',
    fecha_solicitud: '09/11/2025',
    fecha_resultado: '11/11/2025',
    imagenes: ['Radiografía_Tórax_1.jpg', 'Radiografía_Tórax_2.jpg'],
    interpretacion: 'Campos pulmonares claros, corazón de tamaño normal, sin alteraciones.'
  };

  // Hide form for Farmacéutico (role 2)
  if (userRole === '2') {
    if (form) form.style.display = 'none';
  }

  // Utility: create an input row for a given imagen value
  function createImagenRow(value = '') {
    const row = document.createElement('div');
    row.className = 'row-group';
    row.style.marginBottom = '8px';
    row.innerHTML = `
      <p style="flex:1 1 80%; margin:0"><input type="text" value="${value || ''}" class="imagen-input" placeholder="Nombre del archivo"/></p>
      <button type="button" class="btn-delete-imagen" style="flex:0 0 auto; padding:8px 10px; background:#ff6b6b; color:#fff; border:none; border-radius:6px; cursor:pointer">✕</button>
    `;
    row.querySelector('.btn-delete-imagen').addEventListener('click', (e) => { e.preventDefault(); row.remove(); });
    return row;
  }

  // Add handler to add imagen button
  addImagenBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    imagenesCcontainer.appendChild(createImagenRow()); 
  });

  // If edit mode, populate with sample data
  const isEditing = sessionStorage.getItem('editEstudioMode') === 'true';
  if (isEditing) {
    document.getElementById('estudio-id-cita-input').value = sample.id_cita;
    document.getElementById('estudio-id-estudio-input').value = sample.id_estudio;
    document.getElementById('estudio-fecha-solicitud-input').value = sample.fecha_solicitud;
    document.getElementById('estudio-fecha-resultado-input').value = sample.fecha_resultado;
    document.getElementById('estudio-interpretacion-input').value = sample.interpretacion;
    
    // Populate imagenes
    sample.imagenes.forEach(img => {
      imagenesCcontainer.appendChild(createImagenRow(img));
    });
    
    sessionStorage.removeItem('editEstudioMode');
  }

  // Cancel -> go back to estudio page
  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'estudio.html';
  });

  // Confirm -> no save in prototype, just redirect back
  confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'estudio.html';
  });
});
