// Seleccionamos los elementos del HTML
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('#nav-links');
const enlaces = document.querySelectorAll('.nav-links li a');

// Evento para abrir/cerrar el menú al tocar la hamburguesa
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Opcional: Cambiar el ícono de barras a una 'X' al abrir
    const icon = menuToggle.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Evento para cerrar el menú cuando tocamos un enlace (muy útil en móviles)
enlaces.forEach(enlace => {
    enlace.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Regresamos el ícono a las barras
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});