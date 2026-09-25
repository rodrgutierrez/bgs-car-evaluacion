// 1. Array de Objetos (Nuestro Catálogo de Vehículos)
const vehiculosDestacados = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "Camry 2026",
        asientos: 4,
        transmision: "Automático",
        precioDia: 59500,
        imagen: "assets/img/camry.png"
    },
    {
        id: 2,
        marca: "Ford",
        modelo: "Mustang GT",
        asientos: 4,
        transmision: "Manual",
        precioDia: 99900,
        imagen: "assets/img/mustang.png"
    },
    {
        id: 3,
        marca: "Tesla",
        modelo: "Model 3",
        asientos: 4,
        transmision: "Automático",
        precioDia: 109000,
        imagen: "assets/img/tesla.png"
    }
];

// 2. Función para renderizar los vehículos en el HTML
function cargarDestacados() {
    const contenedor = document.getElementById('contenedor-destacados');
    
    // Limpiamos el contenedor (borramos lo que haya en el HTML)
    contenedor.innerHTML = '';

    // Recorremos el arreglo y creamos las tarjetas
    vehiculosDestacados.forEach(auto => {
        // Formato de moneda chilena
        const precioCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(auto.precioDia);

        const tarjeta = `
            <div class="col-md-4 mb-4">
                <div class="card bg-black border-secondary h-100 shadow">
                    <img src="${auto.imagen}" class="card-img-top" alt="${auto.marca} ${auto.modelo}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-bgs">${auto.marca} ${auto.modelo}</h5>
                        <p class="card-text small text-white-50">
                            <i class="bi bi-person-fill"></i> ${auto.asientos} Asientos | 
                            <i class="bi bi-gear-fill"></i> ${auto.transmision}
                        </p>
                        <div class="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
                            <span class="fs-4 fw-bold text-light">${precioCLP}<small class="fs-6 text-white-50">/día</small></span>
                            <button class="btn btn-outline-bgs" onclick="rentarAuto(${auto.id})">Rentar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}

// 3. Cuando la página cargue, ejecutamos la función
document.addEventListener('DOMContentLoaded', () => {
    cargarDestacados();
});

// Función temporal para el botón
function rentarAuto(id) {
    alert("Próximamente: Auto " + id + " agregado al carrito usando LocalStorage");
}