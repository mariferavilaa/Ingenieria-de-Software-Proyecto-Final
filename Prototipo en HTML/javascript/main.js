document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("main-title");
    const listContainer = document.getElementById("main-list");
    const searchInput = document.getElementById("global-search");
    const addBtn = document.getElementById("btn-add");

    // Read user role
    const userRole = localStorage.getItem("userRole");

    // Show add button for Médico (1) and Administrador (3)
    if (userRole === "1" || userRole === "3") {
        addBtn.classList.remove("hidden");
    }

    // Read mode
    let mode = localStorage.getItem("mainMode") || "pacientes";

    const patients = [
        {id:"123456", curp:"ABCD123456ABCDEF1A", edad:30, fn:"01/12/2000", nombre:"John Doe"},
        {id:"234567", curp:"EFGH234567BCDEFG2B", edad:45, fn:"03/04/1979", nombre:"María Pérez"},
        {id:"345678", curp:"IJKL345678CDEFGH3C", edad:28, fn:"22/08/1996", nombre:"Carlos Sánchez"},
        {id:"456789", curp:"MNOP456789DEFGHI4D", edad:52, fn:"10/10/1972", nombre:"Ana Gómez"},
        {id:"567890", curp:"QRST567890EFGHIJ5E", edad:35, fn:"05/06/1990", nombre:"Luis Rodríguez"}
    ];

    const staff = [
        {id:"S001", rol:"Médico", edad:42, especialidad:"Medicina Interna", telefono:"55-1234-5678", nombre:"Dra. Alejandra Ruiz"},
        {id:"S002", rol:"Farmacéutico", edad:36, especialidad:"Farmacia Clínica", telefono:"55-9876-5432", nombre:"José Martínez"},
        {id:"S003", rol:"Administrador", edad:50, especialidad:"Administración", telefono:"55-1111-2222", nombre:"Laura Ortega"}
    ];

    // ---- RENDER PATIENTS ----
    function renderPacientes(list) {
        title.textContent = "Pacientes";
        listContainer.innerHTML = list.map(p => `
            <div class="info-box-pacientes" onclick=infoPagePatients()>
                <span><b>ID:</b> ${p.id}</span>
                <span><b>CURP:</b> ${p.curp}</span>
                <span><b>Edad:</b> ${p.edad}</span>
                <span><b>Fecha de Nacimiento:</b> ${p.fn}</span>
                <span><b>Nombre:</b> ${p.nombre}</span>
            </div>
        `).join("");
    }

    // ---- RENDER STAFF ----
    function renderPersonal(list) {
        title.textContent = "Personal";
        listContainer.innerHTML = list.map(p => `
            <div class="info-box-personal" onclick=infoPageStaff()>
                <span><b>ID:</b> ${p.id}</span>
                <span><b>Rol:</b> ${p.rol}</span>
                <span><b>Edad:</b> ${p.edad}</span>
                <span><b>Especialidad:</b> ${p.especialidad}</span>
                <span><b>Teléfono:</b> ${p.telefono}</span>
                <span><b>Nombre:</b> ${p.nombre}</span>
            </div>
        `).join("");
    }

    // Initial render
    if (mode === "pacientes") renderPacientes(patients);
    else renderPersonal(staff);

    // Update button text based on mode and role
    updateAddButton();

    // ---- SEARCH FILTER ----
    searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();

        if (mode === "pacientes") {
            const filtered = patients.filter(p =>
                p.id.includes(q) ||
                p.nombre.toLowerCase().includes(q)
            );
            renderPacientes(filtered);
        } else {
            const filtered = staff.filter(p =>
                p.id.includes(q) ||
                p.nombre.toLowerCase().includes(q) ||
                p.rol.toLowerCase().includes(q)
            );
            renderPersonal(filtered);
        }
    });
});

/* Load page with the right patient info. Since its a prototype it will always load the same person */
function infoPagePatients() {
    window.location.href = "info-patients.html";
}

function infoPageStaff() {
    window.location.href = "info-staff.html";
}

// Update button text and handler based on role and current mode
function updateAddButton() {
    const addBtn = document.getElementById("btn-add");
    const userRole = localStorage.getItem("userRole");
    const mode = localStorage.getItem("mainMode") || "pacientes";

    if (userRole === "1") {
        // Médico: only patients
        addBtn.textContent = "Dar paciente de alta";
    } else if (userRole === "3") {
        // Administrador: changes based on mode
        addBtn.textContent = mode === "pacientes" ? "Dar paciente de alta" : "Dar médico de alta";
    }
}

function addNew() {
    const mode = localStorage.getItem("mainMode") || "pacientes";

    if (mode === "pacientes") {
        sessionStorage.removeItem('editMode');  // empty form
        window.location.href = 'edit-info-patient.html';
    } else {
        sessionStorage.removeItem('editStaffMode');  // empty form
        window.location.href = 'edit-info-staff.html';
    }
}