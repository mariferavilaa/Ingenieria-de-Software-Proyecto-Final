document.addEventListener('DOMContentLoaded', () => {
  const estudiosData = [
    {
      id: 1,
      id_cita: 'C001',
      id_estudio: 'EST001',
      fecha_solicitud: '09/11/2025',
      fecha_resultado: '11/11/2025',
      imagenes: ['Radiografía_Tórax_1.jpg', 'Radiografía_Tórax_2.jpg'],
      interpretacion: 'Campos pulmonares claros, corazón de tamaño normal, sin alteraciones.'
    },
    {
      id: 2,
      id_cita: 'C002',
      id_estudio: 'EST002',
      fecha_solicitud: '09/11/2025',
      fecha_resultado: '10/11/2025',
      imagenes: ['Análisis_Sangre_1.pdf'],
      interpretacion: 'Hemoglobina: 14.5 g/dL, Glucosa: 95 mg/dL, Colesterol Total: 180 mg/dL. Valores dentro de los rangos normales.'
    },
    {
      id: 3,
      id_cita: 'C003',
      id_estudio: 'EST003',
      fecha_solicitud: '10/11/2025',
      fecha_resultado: '11/11/2025',
      imagenes: ['ECG_1.jpg'],
      interpretacion: 'Ritmo sinusal regular, frecuencia cardíaca 72 lpm, sin alteraciones del segmento ST. ECG normal.'
    },
    {
      id: 4,
      id_cita: 'C004',
      id_estudio: 'EST004',
      fecha_solicitud: '11/11/2025',
      fecha_resultado: '12/11/2025',
      imagenes: ['RM_Cerebro_1.jpg', 'RM_Cerebro_2.jpg', 'RM_Cerebro_3.jpg'],
      interpretacion: 'No se observan lesiones agudas ni crónicas. Estudio completado sin incidentes.'
    }
  ];

  const userRole = localStorage.getItem('userRole');
  const estudiosId = sessionStorage.getItem('currentEstudio');
  const estudio = estudiosData.find(e => e.id === parseInt(estudiosId)) || estudiosData[0];

  const actionButtonsContainer = document.getElementById('action-buttons-container');

  // Hide action buttons for Farmacéutico
  if (userRole === '2') {
    actionButtonsContainer.style.display = 'none';
  }

  // Helper function to set text content
  function setText(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = value || '-';
  }

  // Show fields
  setText('page-title', `Estudio: ${estudio.id_estudio}`);
  setText('estudio-id-cita', estudio.id_cita);
  setText('estudio-id-estudio', estudio.id_estudio);
  setText('estudio-fecha-solicitud', estudio.fecha_solicitud);
  setText('estudio-fecha-resultado', estudio.fecha_resultado);
  setText('estudio-interpretacion', estudio.interpretacion);

  // Show imagenes list
  const imagenesList = document.getElementById('estudio-imagenes-list');
  if (estudio.imagenes && estudio.imagenes.length > 0) {
    imagenesList.innerHTML = estudio.imagenes.map(img => `<div style="margin-bottom: 6px;">• ${img}</div>`).join('');
  }

  // Set delete confirmation name
  document.getElementById('confirm-estudio-name').textContent = estudio.id_estudio;

  // Delete button setup
  const overlay = document.getElementById('overlay-confirm');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

  document.getElementById('deleteBtn').addEventListener('click', () => {
    overlay.style.display = 'flex';
  });

  cancelDeleteBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  confirmDeleteBtn.addEventListener('click', () => {
    localStorage.setItem('deleteMessage', `Estudio "${estudio.id_estudio}" eliminado correctamente.`);
    sessionStorage.removeItem('currentEstudio');
    window.location.href = 'estudio.html';
  });

  // Auto-hide overlay after 8 seconds if shown
  let overlayTimeout;
  const originalDisplay = overlay.style.display;
  const observer = new MutationObserver(() => {
    if (overlay.style.display === 'flex') {
      clearTimeout(overlayTimeout);
      overlayTimeout = setTimeout(() => {
        overlay.style.display = 'none';
      }, 8000);
    }
  });
  observer.observe(overlay, { attributes: true, attributeFilter: ['style'] });
});

function editEstudio() {
  sessionStorage.setItem('editEstudioMode', 'true');
  window.location.href = 'edit-estudio.html';
}
