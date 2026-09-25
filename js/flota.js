const flotaCompleta = [
    { id: 1, marca: "Toyota", modelo: "Camry 2026", categoria: "sedan", transmision: "Automático", precioDia: 59500, imagen: "assets/img/camry.png" },
    { id: 2, marca: "Ford", modelo: "Mustang GT", categoria: "deportivo", transmision: "Manual", precioDia: 99900, imagen: "assets/img/mustang.png" },
    { id: 3, marca: "Tesla", modelo: "Model 3", categoria: "sedan", transmision: "Automático", precioDia: 109000, imagen: "assets/img/tesla.png" },
    { id: 4, marca: "Chevrolet", modelo: "Suburban", categoria: "suv", transmision: "Automático", precioDia: 85000, imagen: "assets/img/suburvan.png" },
    { id: 5, marca: "Volkswagen", modelo: "Passat", categoria: "sedan", transmision: "Manual", precioDia: 49000, imagen: "assets/img/passat.png" },
    { id: 6, marca: "RAM", modelo: "1500", categoria: "camioneta", transmision: "Automático", precioDia: 75000, imagen: "assets/img/ram.png" }
];

function renderizarFlota(autosAMostrar = flotaCompleta) {
    const contenedor = document.getElementById('contenedor-flota');
    if (!contenedor) return;
    
    contenedor.innerHTML = ''; 

    if (autosAMostrar.length === 0) {
        contenedor.innerHTML = '<div class="col-12"><p class="text-light fs-5">No se encontraron vehículos con esos filtros.</p></div>';
        return;
    }

    autosAMostrar.forEach(auto => {
        const precioCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(auto.precioDia);
        const categoriaVisual = auto.categoria.charAt(0).toUpperCase() + auto.categoria.slice(1); 

        const tarjeta = `
            <div class="col-md-4 mb-4">
                <div class="card bg-black border-secondary h-100 shadow">
                    <img src="${auto.imagen}" class="card-img-top" alt="${auto.marca} ${auto.modelo}" style="height: 180px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${categoriaVisual}</span>
                        <h5 class="card-title text-bgs">${auto.marca} ${auto.modelo}</h5>
                        <p class="card-text small text-white-50">
                            <i class="bi bi-gear-fill"></i> ${auto.transmision}
                        </p>
                        <div class="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
                            <span class="fs-5 fw-bold text-light">${precioCLP}<small class="fs-6 text-white-50">/día</small></span>
                            <button class="btn btn-outline-bgs btn-sm" onclick="rentarDesdeFlota(${auto.id})">Rentar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}

function rentarDesdeFlota(id) {
    const autoSeleccionado = flotaCompleta.find(auto => auto.id === id);
    if(autoSeleccionado) {
        agregarAlCarrito(autoSeleccionado); 
    }
}

function aplicarFiltros() {
    const manualMarcado = document.getElementById('filtro-manual').checked;
    const automaticoMarcado = document.getElementById('filtro-automatico').checked;
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;

    const autosFiltrados = flotaCompleta.filter(auto => {
        let cumpleTransmision = true;
        
        if (manualMarcado && !automaticoMarcado) {
            cumpleTransmision = auto.transmision === "Manual";
        } else if (!manualMarcado && automaticoMarcado) {
            cumpleTransmision = auto.transmision === "Automático";
        }

        let cumpleCategoria = true;
        if (categoriaSeleccionada !== "todos") {
            cumpleCategoria = auto.categoria === categoriaSeleccionada;
        }

        return cumpleTransmision && cumpleCategoria;
    });

    renderizarFlota(autosFiltrados);
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarFlota(); 
    
    const btnFiltrar = document.getElementById('btn-filtrar');
    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', aplicarFiltros);
    }
});