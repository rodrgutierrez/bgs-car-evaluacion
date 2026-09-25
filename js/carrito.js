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



function renderizarCarrito() {
    const contenedorTabla = document.getElementById('tabla-carrito');
    const contenedorTotal = document.getElementById('total-carrito');
    

    if (contenedorTabla === null) return;

   
    contenedorTabla.innerHTML = '';
    let total = 0;


    if (carrito.length === 0) {
        contenedorTabla.innerHTML = '<tr><td colspan="4" class="text-center text-white-50 py-4">No tienes vehículos en tu reserva.</td></tr>';
        contenedorTotal.innerText = '$0';
        return;
    }


    carrito.forEach(function(auto) {
   
        const subtotal = auto.precioDia * auto.cantidad;
        total = total + subtotal;

        const precioClp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(auto.precioDia);
        const subtotalClp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(subtotal);

        const fila = `
            <tr class="border-secondary">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${auto.imagen}" alt="${auto.modelo}" style="width: 70px; height: 45px; object-fit: cover; border-radius: 4px;" class="me-3">
                        <div class="text-light fw-bold">${auto.marca} ${auto.modelo}</div>
                    </div>
                </td>
                <td class="text-white-50">${precioClp}</td>
                <td class="text-light fw-bold">${auto.cantidad}</td>
                <td class="text-end text-bgs fw-bold">${subtotalClp}</td>
            </tr>
        `;
        contenedorTabla.innerHTML += fila;
    });

  
    contenedorTotal.innerText = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(total);
}


function vaciarCarrito() {
    
    if (confirm("¿Estás seguro de que deseas eliminar tu reserva?")) {
        carrito = []; 
        localStorage.setItem('bgs_carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();
    }
}

function confirmarReserva() {
    if (carrito.length === 0) {
        alert("No puedes confirmar una reserva vacía.");
        return;
    }
    
    const usuario = localStorage.getItem('bgs_usuario') || "Cliente";
    
    alert(`¡Gracias por tu reserva, ${usuario}! Nos contactaremos pronto para la entrega de tu vehículo.`);
    
    carrito = [];
    localStorage.setItem('bgs_carrito', JSON.stringify(carrito));
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    verificarUsuario();
    renderizarCarrito();

    const botonVaciar = document.getElementById('btn-vaciar');
    if (botonVaciar !== null) {
        botonVaciar.addEventListener("click", vaciarCarrito);
    }

    const botonConfirmar = document.getElementById('btn-confirmar');
    if (botonConfirmar !== null) {
        botonConfirmar.addEventListener("click", confirmarReserva);
    }
});