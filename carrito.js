// Clase para gestionar el carrito
class Carrito {
    constructor() {
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    agregarProducto(producto) {
        const index = this.carrito.findIndex(p => p.nombre === producto.nombre);
        if (index !== -1) {
            this.carrito[index].cantidad += producto.cantidad;
        } else {
            this.carrito.push(producto);
        }
        this.guardarCarrito();
    }

    actualizarCantidad(index, cambio) {
        this.carrito[index].cantidad += cambio;
        if (this.carrito[index].cantidad < 1) {
            this.carrito[index].cantidad = 1;
        }
        this.guardarCarrito();
    }

    eliminarProducto(index) {
        this.carrito.splice(index, 1);
        this.guardarCarrito();
    }

    vaciarCarrito() {
        this.carrito = [];
        this.guardarCarrito();
    }

    obtenerTotal() {
        return this.carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    }
}

// Función para mostrar el carrito
function cargarCarritoUI(carrito) {
    const contenedorCarrito = document.getElementById('productosCarrito');
    contenedorCarrito.innerHTML = '';

    if (carrito.carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        carrito.carrito.forEach((producto, index) => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('col-md-4');
            productoElemento.innerHTML = `
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <button class="btn btn-warning btn-sm" onclick="actualizarCantidad(${index}, -1)">-</button>
                                <span class="mx-2">Cantidad: ${producto.cantidad}</span>
                                <button class="btn btn-warning btn-sm" onclick="actualizarCantidad(${index}, 1)">+</button>
                            </div>
                            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            contenedorCarrito.appendChild(productoElemento);
        });

        // Mostrar el total
        const totalElemento = document.createElement('div');
        totalElemento.classList.add('col-12', 'text-end', 'mt-3');
        totalElemento.innerHTML = `<h4>Total: $${carrito.obtenerTotal().toFixed(2)}</h4>`;
        contenedorCarrito.appendChild(totalElemento);
    }
}

// Instancia del carrito
const carrito = new Carrito();

// Funciones para manejar eventos
function actualizarCantidad(index, cambio) {
    carrito.actualizarCantidad(index, cambio);
    cargarCarritoUI(carrito);
}

function eliminarProducto(index) {
    carrito.eliminarProducto(index);
    cargarCarritoUI(carrito);
}

function vaciarCarrito() {
    carrito.vaciarCarrito();
    cargarCarritoUI(carrito);
}

function finalizarCompra() {
    if (carrito.carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    alert(`Compra finalizada. Total a pagar: $${carrito.obtenerTotal().toFixed(2)}. ¡Gracias por tu compra!`);
    vaciarCarrito();
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoUI(carrito);

    // Eventos
    document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
    document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);
});
