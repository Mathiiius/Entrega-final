// Validación para campos completos

document.getElementById('formulario').addEventListener('submit', function(event) {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo || !mensaje) {
    event.preventDefault();
    alert('Por favor, completa todos los campos antes de enviar.');
    }
});