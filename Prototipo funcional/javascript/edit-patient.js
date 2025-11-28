document.addEventListener("DOMContentLoaded", () => {
    // Prototype data source: single patient
    const patients = [
        {
            id: "123456790",
            curp: "ABCD123456ABCDEF1A",
            nombre: "John Doe",
            sexo: "M",
            edad: 30,
            fn: "01/12/2000",
            seguro: "Seguro.jpg",
            direccion: "Municipio, Colonia, Calle, Número de calle",
            telefono: "+52 81 1234 5678",
            correo: "correo@gmail.com",
            emergencia: {
                curp: "ABCD123456ABCDEF1A",
                nombre: "Jane Doe",
                sexo: "F",
                edad: 50,
                fn: "01/12/2000",
                direccion: "Municipio, Colonia, Calle, Número de calle",
                telefono: "+52 81 1234 5679",
                correo: "correo@icloud.com"
            }
        }
    ];

    const p = patients[0];
    const pageTitle = document.getElementById("page-title");
    const cancelBtn = document.getElementById("cancelBtn");
    const confirmBtn = document.getElementById("confirmBtn");

    // Check if editing patient or adding new one
    const isEditing = sessionStorage.getItem("editMode") === "true";

    if (isEditing) {
        pageTitle.textContent = "Editar Paciente";
        // Fill form with data
        document.getElementById("pid").value = p.id;
        document.getElementById("pcurp").value = p.curp;
        document.getElementById("pnombre").value = p.nombre;
        document.getElementById("psexo").value = p.sexo;
        document.getElementById("pedad").value = p.edad;
        document.getElementById("pfn").value = p.fn;
        document.getElementById("pseguro").value = p.seguro;
        document.getElementById("pdireccion").value = p.direccion;
        document.getElementById("ptelefono").value = p.telefono;
        document.getElementById("pcorreo").value = p.correo;

        // Emergency contact
        document.getElementById("ecurp").value = p.emergencia.curp;
        document.getElementById("enombre").value = p.emergencia.nombre;
        document.getElementById("esexo").value = p.emergencia.sexo;
        document.getElementById("eedad").value = p.emergencia.edad;
        document.getElementById("efn").value = p.emergencia.fn;
        document.getElementById("edireccion").value = p.emergencia.direccion;
        document.getElementById("etelefono").value = p.emergencia.telefono;
        document.getElementById("ecorreo").value = p.emergencia.correo;
        
        // Clear the flag
        sessionStorage.removeItem("editMode");
    } else {
        // Adding new patient - leave form empty
        pageTitle.textContent = "Dar Paciente de Alta";
        document.getElementById("pid").value = "";
    }

    // Cancel button: go back to info-patients.html
    if (cancelBtn) {
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = isEditing ? "info-patients.html" : "main.html";
        });
    }

    // Confirm button: go back (prototype doesn't do it)
    if (confirmBtn) {
        confirmBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "info-patients.html";
        });
    }

    // Hide edit/delete for Farmacéutico (role 2)
    const role = localStorage.getItem("userRole");
    if (role === "2") {
        const form = document.getElementById("patient-form");
        if (form) form.style.display = "none";
    }
});
