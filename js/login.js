const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputRut = document.getElementById("rut");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("password");
const botonLogin = document.getElementById("btn-login");

botonLogin.addEventListener("click", function() {
    
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const rut = inputRut.value.trim();
    const correo = inputCorreo.value.trim().toLowerCase();
    const password = inputPassword.value;

    if (nombre === "") {
        alert("El nombre es obligatorio");
        return;
    }
    if (apellido === "") {
        alert("El apellido es obligatorio");
        return;
    }
    if (rut === "") {
        alert("El RUT es obligatorio");
        return;
    }
    if (correo === "") {
        alert("El correo es obligatorio");
        return;
    }
    if (password === "") {
        alert("La contraseña es obligatoria");
        return;
    }

    if (!rut.includes("-")) {
        alert("Ingrese por favor el RUT con guion (ejemplo: 12345678-9)");
        return;
    }

    if (correo.length > 100) {
        alert("El correo no puede tener más de 100 caracteres");
        return;
    }

    if (correo.includes(" ")) {
        alert("El correo no puede contener espacios");
        return;
    }

    const esDominioValido = correo.endsWith("@duoc.cl") || 
                            correo.endsWith("@profesor.duoc.cl") || 
                            correo.endsWith("@gmail.com");

    if (!esDominioValido) {
        alert("El correo debe ser de dominio @duoc.cl, @profesor.duoc.cl o @gmail.com");
        return;
    }

    if (password.length < 4 || password.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres");
        return;
    }

    localStorage.setItem("bgs_usuario", nombre);

    if (correo === "admin@duoc.cl") {
        localStorage.setItem("rol_usuario", "admin");
        alert(`¡Bienvenido Administrador/a ${nombre}! Redirigiendo al panel de control...`);
        document.getElementById("formulario-login").reset();
        window.location.href = "admin.html";
    } else {
        localStorage.setItem("rol_usuario", "cliente");
        alert(`¡Bienvenido/a a BGS Car, ${nombre}!`);
        document.getElementById("formulario-login").reset();
        window.location.href = "index.html";
    }
});