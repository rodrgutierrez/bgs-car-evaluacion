let carrito = JSON.parse(localStorage.getItem('bgs_carrito')) || [];

function agregarAlCarrito(vehiculo) {
    const autoExistente = carrito.find(item => item.id === vehiculo.id);
    
    if (autoExistente) {
        autoExistente.cantidad++;
    } else {
        vehiculo.cantidad = 1;
        carrito.push(vehiculo);
    }

    localStorage.setItem('bgs_carrito', JSON.stringify(carrito));
    
    actualizarContadorCarrito();
    
    alert(`¡${vehiculo.marca} ${vehiculo.modelo} se agregó a tu reserva!`);
}

function actualizarContadorCarrito() {
    const contadorElemento = document.getElementById('contador-carrito');
    if (contadorElemento) {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contadorElemento.innerText = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});

// Función para mostrar el nombre del usuario si ya inició sesión
function verificarUsuario() {
    const usuarioActual = localStorage.getItem('bgs_usuario');
    
    if (usuarioActual !== null) {
        const botonLoginNav = document.getElementById('enlace-login');
        
        if (botonLoginNav !== null) {
            botonLoginNav.innerHTML = '<i class="bi bi-person-check-fill"></i> Hola, ' + usuarioActual;
            botonLoginNav.classList.remove("btn-outline-bgs");
            botonLoginNav.classList.add("btn-bgs");
            botonLoginNav.href = "#"; 
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    verificarUsuario();
});