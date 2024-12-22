// Función para obtener mangas desde la API
const obtenerMangas = async () => {
    try {
      // Solicitud a la API de Jikan
      const response = await fetch('https://api.jikan.moe/v4/manga');
      const data = await response.json();
  
      // Mostramos los primeros 15 mangas 
      const mangas = data.data.slice(0, 15);
  
      // Contenedor donde se mostrarán los productos
      const listaProductos = document.getElementById('listaProductos');
  
      // Iteramos sobre los mangas y creamos los elementos HTML correspondientes
      mangas.forEach((manga) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');
  
        // HTML 
        card.innerHTML = `
          <div class="card">
            <img src="${manga.images.jpg.large_image_url}" class="card-img-top" alt="${manga.title}">
            <div class="card-body">
              <h5 class="card-title">${manga.title}</h5>
              <p class="card-text">${manga.synopsis.slice(0, 100)}...</p>
              <button class="btn btn-primary añadir-carrito" data-id="${manga.mal_id}" data-titulo="${manga.title}" data-imagen="${manga.images.jpg.large_image_url}" data-synopsis="${manga.synopsis}">Añadir al carrito</button>
            </div>
          </div>
        `;
  
        // Agregamos la tarjeta al contenedor
        listaProductos.appendChild(card);
      });
  
      // Agregar evento para el botón de añadir al carrito
      const botonesCarrito = document.querySelectorAll('.añadir-carrito');
      botonesCarrito.forEach((boton) => {
        boton.addEventListener('click', (e) => {
          const manga = e.target;
          const producto = {
            id: manga.getAttribute('data-id'),
            titulo: manga.getAttribute('data-titulo'),
            imagen: manga.getAttribute('data-imagen'),
            synopsis: manga.getAttribute('data-synopsis'),
            cantidad: 1 
          };
  
          // Obtener los productos del carrito desde localStorage o inicializar uno vacío
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
          // Verificar si el manga ya está en el carrito
          const mangaExistente = carrito.find(item => item.id === producto.id);
          if (!mangaExistente) {
            // Si no está, agregar el nuevo manga al carrito
            carrito.push(producto);
  
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
  
            // Puedes agregar un mensaje o cambiar el texto del botón
            alert(`${producto.titulo} ha sido añadido al carrito`);
          } else {
            alert(`${producto.titulo} ya está en el carrito`);
          }
        });
      });
  
    } catch (error) {
      console.error('Error al obtener los mangas:', error);
    }
  };
  
  // Llamamos a la función cuando se carga la página
  document.addEventListener('DOMContentLoaded', () => {
    obtenerMangas();
  });
  