// Show/Hide password
function togglePassword() {
    const pass = document.getElementById("password");
    const btn = document.querySelector(".toggle-btn");

    if (pass.type === "password") {
        pass.type = "text";
        btn.textContent = "Ocultar";
    } else {
        pass.type = "password";
        btn.textContent = "Mostrar";
    }
}

// Since its a prototype this will do, the real aplication would need encryption
function login() {
    const user = document.getElementById("correo").value.trim().toLowerCase();

    let role = 0;
    if (user === "médico" || user === "medico" || user === "m") role = 1;
    else if (user === "farmacéutico" || user === "farmaceutico" || user === "f") role = 2;
    else if (user === "administrador" || user === "admin" || user === "a") role = 3;

    if (role === 0) { 
        alert("Usuario no reconocido. \nPara el prototipo usa:\nmédico, medico, m\n farmacéutico, farmaceutico, f\nadministrador, admin, a");
        return;
    }

    // Save integer role for other pages
    localStorage.setItem("userRole", role);
    localStorage.setItem("mainMode", "pacientes"); // always start with patients. (bug can happen otherwise)

    window.location.href = "main.html";
}