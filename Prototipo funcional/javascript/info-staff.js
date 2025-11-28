document.addEventListener("DOMContentLoaded", () => {
    // Prototype data source: single staff member inside an array
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
            cedula: { href: '#', text: 'Cedula.jpg' }
        }
    ];

    // Use the first staff member
    const s = staffList[0];

    // Fill staff info
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = value;
    };

    setText('sid', s.id);
    setText('sespecialidad', s.especialidad);
    setText('snombre', s.nombre);
    setText('ssexo', s.sexo);
    setText('sedad', s.edad);
    setText('sfn', s.fn);
    setText('sdireccion', s.direccion);
    setText('stelefono', s.telefono);
    setText('scorreo', s.correo);
    setText('srol', s.rol);

    const cedulaLink = document.getElementById('scedula');
    if (cedulaLink) {
        cedulaLink.textContent = s.cedula.text;
        cedulaLink.setAttribute('href', s.cedula.href);
    }

    // Hide edit/delete for Farmacéutico (role 2)
    const role = localStorage.getItem('userRole');
    if (role === '2') {
        const ab = document.getElementById('actionButtons');
        if (ab) ab.style.display = 'none';
    }

    // DELETE and EDIT button handlers
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
            // show patient name
            if (confirmNameEl) confirmNameEl.textContent = s.nombre;
            // tint is done by the overlay background in css
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
            sessionStorage.setItem('editStaffMode', 'true');
            window.location.href = 'edit-info-staff.html';
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
            // Move back to main.html and show a small success message (prototype doesn't do it)
            hideOverlay();
            // to show the confirmation in another page
            localStorage.setItem('deleteMessage', JSON.stringify({
            text: `Personal ${s.nombre} dado de baja.`,
            className: 'delete-success'
        }));

        window.location.href = "main.html";
        });
    }
});
