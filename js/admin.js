const rolUsuario = localStorage.getItem("rol_usuario");

if (rolUsuario !== "admin") {
    alert("Acceso denegado. Esta sección es solo para administradores.");
    window.location.href = "index.html";
}


let flotaAdmin = JSON.parse(localStorage.getItem('bgs_flota')) || [];

function renderizarTablaAdmin() {
    const cuerpoTabla = document.getElementById('tabla-admin');
    if (cuerpoTabla === null) return;
    
    cuerpoTabla.innerHTML = '';
    document.getElementById('total-autos').innerText = flotaAdmin.length + " vehículos";

    flotaAdmin.forEach(function(auto, index) {
        const precioCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(auto.precioDia);
        
        const fila = `
            <tr>
                <td class="text-white-50">#${auto.id}</td>
                <td class="fw-bold">${auto.marca} ${auto.modelo}</td>
                <td><span class="badge bg-secondary">${auto.categoria}</span></td>
                <td>${precioCLP}</td>
                <td class="text-end">
                    <button class="btn btn-outline-danger btn-sm" onclick="eliminarAuto(${index})">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
        `;
        cuerpoTabla.innerHTML += fila;
    });
}

function eliminarAuto(index) {
    if (confirm("¿Estás seguro de eliminar este vehículo del catálogo?")) {
        flotaAdmin.splice(index, 1);
        localStorage.setItem('bgs_flota', JSON.stringify(flotaAdmin));
        renderizarTablaAdmin();
        alert("Vehículo eliminado del catálogo.");
    }
}

const btnGuardar = document.getElementById('btn-guardar-auto');

if (btnGuardar !== null) {
    btnGuardar.addEventListener('click', function() {
        
        const marca = document.getElementById('admin-marca').value.trim();
        const modelo = document.getElementById('admin-modelo').value.trim();
        const categoria = document.getElementById('admin-categoria').value;
        const transmision = document.getElementById('admin-transmision').value;
        const precio = document.getElementById('admin-precio').value;
        const imagen = document.getElementById('admin-imagen').value.trim();

        if (marca === "" || modelo === "") {
            alert("La marca y el modelo son obligatorios.");
            return;
        }
        if (precio === "" || precio <= 0) {
            alert("Ingrese un precio válido.");
            return;
        }
        if (imagen === "") {
            alert("La URL de la imagen es obligatoria.");
            return;
        }

        let nuevoId = 1;
        if (flotaAdmin.length > 0) {
            nuevoId = flotaAdmin[flotaAdmin.length - 1].id + 1;
        }

        const nuevoAuto = {
            id: nuevoId,
            marca: marca,
            modelo: modelo,
            categoria: categoria,
            transmision: transmision,
            precioDia: parseInt(precio),
            imagen: imagen
        };

        flotaAdmin.push(nuevoAuto);
        localStorage.setItem('bgs_flota', JSON.stringify(flotaAdmin));

        document.getElementById('form-admin').reset();
        alert("¡Vehículo añadido exitosamente al catálogo!");
        renderizarTablaAdmin();
    });
}

document.addEventListener('DOMContentLoaded', renderizarTablaAdmin);