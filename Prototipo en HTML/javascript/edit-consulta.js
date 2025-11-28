document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consulta-form');
  const pageTitle = document.getElementById('page-title');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');
  const addMedicBtn = document.getElementById('add-medicamento');
  const medicContainer = document.getElementById('medicamentos-container');

  const userRole = localStorage.getItem('userRole');

  // Hide form for Farmacéutico (role 2)
  if (userRole === '2') {
    form.style.display = 'none';
  }

  // Check if editing or adding
  const isEditing = sessionStorage.getItem('editConsultaMode') === 'true';

  // Prototype data source
  const consulta = {
    date: '09/11/2025',
    medico: 'Dr. Alejandro Pérez',
    estado: 'Atendido',
    hora: '09:30',
    razon: 'Chequeo general',
    diagnostico: 'Hipertensión leve',
    seguimiento: 'Control en 1 mes',
    peso: 75.5,
    estatura: 175,
    presion_arterial: '130/85',
    frecuencia_cardiaca: 72,
    temperatura: 36.8,
    saturacion_oxigeno: 98,
    imc: 24.6,
    habitus_exterior: 'Paciente lúcido y orientado',
    cabeza_oidos_nariz: 'Normal',
    piel: 'Normotenso, normohidratado',
    ojos: 'Pupilas isocóricas reactivas',
    torax: 'Campos pulmonares claros',
    abdomen: 'Blando, depresible, sin masas',
    extremidades: 'Con edema leve en miembros inferiores',
    neurologico: 'Reflejos presentes y simétricos',
    estudios: ['Radiografía de tórax', 'Perfil bioquímico completo', 'Amilasa'],
    recomendaciones: 'Dieta baja en sodio, ejercicio 30 min/día, evitar estrés',
    medicamentos: [
      { nombre: 'Losartán', dosis: '50 mg', frecuencia: 'Una vez al día', duracion: '30 días' },
      { nombre: 'Atorvastatina', dosis: '20 mg', frecuencia: 'Una vez al día', duracion: '60 días' }
    ],
    firma: 'Dr. Alejandro Pérez - Cédula: 123456'
  };

  // Helper to set input value
  function setInputValue(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.value = value || '';
  }

  // Fill form if editing
  if (isEditing) {
    pageTitle.textContent = 'Editar Consulta';
    setInputValue('medico-tratante', consulta.medico);
    setInputValue('estado-consulta', consulta.estado);
    setInputValue('hora-consulta', consulta.hora);
    setInputValue('diagnostico', consulta.diagnostico);
    setInputValue('motivo-consulta', consulta.razon);
    setInputValue('seguimiento', consulta.seguimiento);
    setInputValue('peso', consulta.peso);
    setInputValue('estatura', consulta.estatura);
    setInputValue('presion-arterial', consulta.presion_arterial);
    setInputValue('frecuencia-cardiaca', consulta.frecuencia_cardiaca);
    setInputValue('temperatura', consulta.temperatura);
    setInputValue('saturacion-oxigeno', consulta.saturacion_oxigeno);
    setInputValue('imc', consulta.imc);
    setInputValue('habitus-exterior', consulta.habitus_exterior);
    setInputValue('cabeza-oidos-nariz', consulta.cabeza_oidos_nariz);
    setInputValue('piel', consulta.piel);
    setInputValue('ojos', consulta.ojos);
    setInputValue('torax', consulta.torax);
    setInputValue('abdomen', consulta.abdomen);
    setInputValue('extremidades', consulta.extremidades);
    setInputValue('neurologico', consulta.neurologico);
    document.getElementById('estudios-input').value = consulta.estudios.join('\n');
    document.getElementById('recomendaciones').value = consulta.recomendaciones;
    setInputValue('firma', consulta.firma);

    // Fill medicamentos
    if (consulta.medicamentos && consulta.medicamentos.length > 0) {
      consulta.medicamentos.forEach(med => addMedicamentoRow(med));
    }

    sessionStorage.removeItem('editConsultaMode');
  } else {
    pageTitle.textContent = 'Crear Consulta';
    // Leave form empty for new consulta
  }

  // Render a medicamento rows
  function addMedicamentoRow(med = {}) {
    const rowId = 'med-' + Date.now();
    const row = document.createElement('div');
    row.id = rowId;
    row.className = 'row-group';
    row.style.marginBottom = '10px';
    row.innerHTML = `
      <p style="flex: 1 1 200px;"><input type="text" placeholder="Medicamento" value="${med.nombre || ''}" class="med-nombre" /></p>
      <p style="flex: 1 1 150px;"><input type="text" placeholder="Dosis" value="${med.dosis || ''}" class="med-dosis" /></p>
      <p style="flex: 1 1 180px;"><input type="text" placeholder="Frecuencia" value="${med.frecuencia || ''}" class="med-frecuencia" /></p>
      <p style="flex: 1 1 150px;"><input type="text" placeholder="Duración" value="${med.duracion || ''}" class="med-duracion" /></p>
      <button type="button" class="btn-delete-med" data-row-id="${rowId}" style="flex: 0 0 auto; padding: 8px 12px; background: #6b9fffff; color: white; border: none; border-radius: 6px; cursor: pointer;">✕</button>
    `;
    medicContainer.appendChild(row);

    // Delete button handler
    row.querySelector('.btn-delete-med').addEventListener('click', (e) => {
      e.preventDefault();
      row.remove();
    });
  }

  // Add medicamento button
  addMedicBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addMedicamentoRow();
  });

  // Cancel button
  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isEditing) {
      window.location.href = 'info-consulta.html';
    } else {
      window.location.href = 'consultas.html';
    }
  });

  // Confirm button
  confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Just redirect (prototype)
    window.location.href = 'info-consulta.html';
  });
});
