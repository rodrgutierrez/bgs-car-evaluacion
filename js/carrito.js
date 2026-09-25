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