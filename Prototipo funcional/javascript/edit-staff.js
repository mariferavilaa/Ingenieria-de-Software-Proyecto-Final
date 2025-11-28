document.addEventListener("DOMContentLoaded", () => {
    // Prototype data source: single staff member
    const staffList = [
        {
            id: "S001",
            rol: "Médico",
            edad: 42,
            especialidad: "Medicina Interna",
            telefono: "55-1234-5678",
            nombre: "Dra. Alejandra Ruiz",
            sexo: "F",
            fn: "15/03/1982",
            direccion: "Calle Principal 123, Apartamento 4B",
            correo: "alejandra.ruiz@hospital.com",
            cedula: "Cedula.jpg"
        }
    ];

    const s = staffList[0];
    const pageTitle = document.getElementById("page-title");
    const form = document.getElementById("staff-form");
    const cancelBtn = document.getElementById("cancelBtn");
    const confirmBtn = document.getElementById("confirmBtn");

    // Check if editing staff or adding new one
    const isEditing = sessionStorage.getItem("editStaffMode") === "true";

    if (isEditing) {
        pageTitle.textContent = "Editar Personal";
        // Fill form with data
        document.getElementById("sid").value = s.id;
        document.getElementById("srol").value = s.rol;
        document.getElementById("snombre").value = s.nombre;
        document.getElementById("ssexo").value = s.sexo;
        document.getElementById("sedad").value = s.edad;
        document.getElementById("sfn").value = s.fn;
        document.getElementById("sespecialidad").value = s.especialidad;
        document.getElementById("sdireccion").value = s.direccion;
        document.getElementById("stelefono").value = s.telefono;
        document.getElementById("scorreo").value = s.correo;
        document.getElementById("scedula").value = s.cedula;
        
        // Clear the flag
        sessionStorage.removeItem("editStaffMode");
    } else {
        // Adding new staff - leave form empty
        pageTitle.textContent = "Dar Médico de Alta";
        document.getElementById("sid").value = "";
    }

    // Cancel button: go back to info-staff.html or main.html
    if (cancelBtn) {
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = isEditing ? "info-staff.html" : "main.html";
        });
    }

    // Confirm button: go back (prototype doesn't do it)
    if (confirmBtn) {
        confirmBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Just go back to info-staff.html
            window.location.href = "info-staff.html";
        });
    }

    // Hide edit/delete for Farmacéutico (role 2)
    const role = localStorage.getItem("userRole");
    if (role === "2") {
        if (form) form.style.display = "none";
    }
});
