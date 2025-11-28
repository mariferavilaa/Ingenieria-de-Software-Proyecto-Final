document.addEventListener("DOMContentLoaded", () => {
    // Prototype data source: single patient inside an array
    const patients = [
        {
            id: "123456790",
            curp: "ABCD123456ABCDEF1A",
            nombre: "John Doe",
            sexo: "M",
            edad: 30,
            fn: "01/12/2000",
            seguro: { href: '#', text: 'Seguro.jpg' },
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

    // Use the first patient
    const p = patients[0];

    // Main patient info
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = value;
    };

    setText('pid', p.id);
    setText('pcurp', p.curp);
    setText('pnombre', p.nombre);
    setText('psexo', p.sexo);
    setText('pedad', p.edad);
    setText('pfn', p.fn);
    setText('pdireccion', p.direccion);
    setText('ptelefono', p.telefono);
    setText('pcorreo', p.correo);

    const seguroLink = document.getElementById('pseguro');
    if (seguroLink) {
        seguroLink.textContent = p.seguro.text;
        seguroLink.setAttribute('href', p.seguro.href);
    }

    // Emergency contact
    setText('ecurp', p.emergencia.curp);
    setText('enombre', p.emergencia.nombre);
    setText('esexo', p.emergencia.sexo);
    setText('eedad', p.emergencia.edad);
    setText('efn', p.emergencia.fn);
    setText('edireccion', p.emergencia.direccion);
    setText('etelefono', p.emergencia.telefono);
    setText('ecorreo', p.emergencia.correo);

    // Hide edit/delete for Farmacéutico (role 2)
    const role = localStorage.getItem('userRole');
    if (role === '2') {
        const ab = document.getElementById('actionButtons');
        if (ab) ab.style.display = 'none';
    }

    // DELETE confirmation 
    const deleteBtn = document.querySelector('.delete-btn');
    const editBtn = document.querySelector('.edit-btn');
    const overlay = document.getElementById('overlay-confirm');
    const confirmNameEl = document.getElementById('confirm-patient-name');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    const showOverlay = () => {
        if (overlay) {
            overlay.style.display = 'flex';
            overlay.setAttribute('aria-hidden', 'false');
            // populate patient name
            if (confirmNameEl) confirmNameEl.textContent = p.nombre;
            // tint is done by the overlay background
        }
    };

    const hideOverlay = () => {
        if (overlay) {
            overlay.style.display = 'none';
            overlay.setAttribute('aria-hidden', 'true');
        }
    };

    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showOverlay();
        });
    }

    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Set flag to indicate edit mode (same page but one different elements)
            sessionStorage.setItem('editMode', 'true');
            window.location.href = 'edit-info-patient.html';
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hideOverlay();
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // M back to main.html and show a small success message
            hideOverlay();
            // to show the confirmation in another page
            localStorage.setItem('deleteMessage', JSON.stringify({
            text: `Paciente ${p.nombre} dado de baja.`,
            className: 'delete-success'
        }));

        window.location.href = "main.html";
        });
    }
});