document.addEventListener('DOMContentLoaded', () => {
  // Prototype data source: single consulta inside an array
  const consulta = {
    date: '09/11/2025',
    medico: 'Dr. Alejandro Pérez',
    estado: 'Atendido',
    hora: '09:30',
    razon: 'Chequeo general',
    diagnostico: 'Hipertensión leve',
    seguimiento: 'Control en 1 mes',
    // Signos Vitales
    peso: 75.5,
    estatura: 175,
    presion_arterial: '130/85',
    frecuencia_cardiaca: 72,
    temperatura: 36.8,
    saturacion_oxigeno: 98,
    imc: 24.6,
    // Exploración Física
    habitus_exterior: 'Paciente lúcido y orientado',
    cabeza_oidos_nariz: 'Normal',
    piel: 'Normotenso, normohidratado',
    ojos: 'Pupilas isocóricas reactivas',
    torax: 'Campos pulmonares claros',
    abdomen: 'Blando, depresible, sin masas',
    extremidades: 'Con edema leve en miembros inferiores',
    neurologico: 'Reflejos presentes y simétricos',
    // Estudios Solicitados
    estudios: ['Radiografía de tórax', 'Perfil bioquímico completo', 'Amilasa'],
    // Receta Médica
    recomendaciones: 'Dieta baja en sodio, ejercicio 30 min/día, evitar estrés',
    medicamentos: [
      { nombre: 'Losartán', dosis: '50 mg', frecuencia: 'Una vez al día', duracion: '30 días' },
      { nombre: 'Atorvastatina', dosis: '20 mg', frecuencia: 'Una vez al día', duracion: '60 días' }
    ],
    firma: 'Dr. Alejandro Pérez - Cédula: 123456'
  };

  const userRole = localStorage.getItem('userRole');
  const editBtn = document.getElementById('edit-btn');

  // Hide edit button for Farmacéutico (role 2)
  if (userRole === '2') {
    editBtn.style.display = 'none';
  }

  // Helper function to set text content
  function setText(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = value || '-';
  }

  // PART 1: Información General
  setText('page-title', `Consulta ${consulta.date}`);
  setText('medico-tratante', consulta.medico);
  setText('estado-consulta', consulta.estado);
  setText('hora-consulta', consulta.hora);
  setText('diagnostico', consulta.diagnostico);
  setText('motivo-consulta', consulta.razon);
  setText('seguimiento', consulta.seguimiento);

  // PART 2: Signos Vitales
  setText('peso', consulta.peso);
  setText('estatura', consulta.estatura);
  setText('presion-arterial', consulta.presion_arterial);
  setText('frecuencia-cardiaca', consulta.frecuencia_cardiaca);
  setText('temperatura', consulta.temperatura);
  setText('saturacion-oxigeno', consulta.saturacion_oxigeno);
  setText('imc', consulta.imc);

  // PART 3: Exploración Física
  setText('habitus-exterior', consulta.habitus_exterior);
  setText('cabeza-oidos-nariz', consulta.cabeza_oidos_nariz);
  setText('piel', consulta.piel);
  setText('ojos', consulta.ojos);
  setText('torax', consulta.torax);
  setText('abdomen', consulta.abdomen);
  setText('extremidades', consulta.extremidades);
  setText('neurologico', consulta.neurologico);

  // PART 4: Estudios Solicitados
  const estudiosList = document.getElementById('estudios-list');
  if (consulta.estudios && consulta.estudios.length > 0) {
    estudiosList.innerHTML = consulta.estudios.map(e => `<div style="margin-bottom: 6px;">• ${e}</div>`).join('');
  }

  // PART 5: Receta Médica
  setText('recomendaciones', consulta.recomendaciones);
  
  const medicamentosList = document.getElementById('medicamentos-list');
  if (consulta.medicamentos && consulta.medicamentos.length > 0) {
    medicamentosList.innerHTML = consulta.medicamentos.map(m => `
      <div class="row-group" style="margin-bottom: 8px;">
        <span><b>Medicamento:</b> ${m.nombre}</span>
        <span><b>Dosis:</b> ${m.dosis}</span>
        <span><b>Frecuencia:</b> ${m.frecuencia}</span>
        <span><b>Duración:</b> ${m.duracion}</span>
      </div>
    `).join('');
  }

  setText('firma', consulta.firma);
});

function editConsulta() {
  sessionStorage.setItem('editConsultaMode', 'true');
  window.location.href = 'edit-consulta.html';
}
