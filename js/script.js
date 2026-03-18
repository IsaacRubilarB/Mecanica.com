// =========================================
// MENÚ MÓVIL (Menú Hamburguesa)
// =========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    // Abrir/cerrar menú al tocar la hamburguesa
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace
    document.querySelectorAll('.nav-links a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// =========================================
// LOGOS REBOTANDO (Estilo DVD)
// =========================================
const marcas = [
    // Primera tanda
    'chevrolet.png', 'dfsk.png', 'honda.png', 
    'hyundai.png', 'kia.png', 'mazda.png', 
    'mitsubichi.png', 'nissan.png', 'renault.png', 
    'subaru.png', 'suzuki.png', 'toyota.png', 'VW.png',
    
    // Segunda tanda (clones independientes)
    'chevrolet.png', 'dfsk.png', 'honda.png', 
    'hyundai.png', 'kia.png', 'mazda.png', 
    'mitsubichi.png', 'nissan.png', 'renault.png', 
    'subaru.png', 'suzuki.png', 'toyota.png', 'VW.png'
];

const container = document.getElementById('marcas-flotantes');
const hero = document.querySelector('.hero');
const logosHtml = [];

// 1. Creamos y posicionar aleatoriamente los logos iniciales
marcas.forEach((marca, index) => {
    const img = document.createElement('img');
    img.src = `assets/${marca}`;
    img.className = 'logo-rebote';
    img.id = `logo-${index}`;
    
    // Posición inicial aleatoria dentro del Hero
    const initialX = Math.random() * (hero.clientWidth - 80);
    const initialY = Math.random() * (hero.clientHeight - 80);
    img.style.left = `${initialX}px`;
    img.style.top = `${initialY}px`;
    
    container.appendChild(img);
    
    // Guardar datos de movimiento para cada logo
    logosHtml.push({
        element: img,
        x: initialX,
        y: initialY,
        // Velocidad aleatoria (entre 0.5 y 1.5 píxeles por fotograma)
        dx: (Math.random() - 0.5) * 2, 
        dy: (Math.random() - 0.5) * 2,
        width: 80, 
        height: 60 
    });
});

// 2. Función principal de animación (Bucle)
function animarLogos() {
    // Obtener dimensiones actuales del contenedor
    const containerWidth = hero.clientWidth;
    const containerHeight = hero.clientHeight;

    logosHtml.forEach(logo => {
        // Actualizar posición
        logo.x += logo.dx;
        logo.y += logo.dy;

        // Detectar colisiones con bordes Izquierdo y Derecho
        if (logo.x + logo.width >= containerWidth || logo.x <= 0) {
            logo.dx = -logo.dx; // Invertir dirección horizontal
        }
        
        // Detectar colisiones con bordes Superior e Inferior
        if (logo.y + logo.height >= containerHeight || logo.y <= 0) {
            logo.dy = -logo.dy; // Invertir dirección vertical
        }

        // Aplicar la nueva posición al elemento HTML
        logo.element.style.left = `${logo.x}px`;
        logo.element.style.top = `${logo.y}px`;
    });

    // Solicitar el siguiente fotograma de animación
    requestAnimationFrame(animarLogos);
}

// 3. Iniciar la animación
requestAnimationFrame(animarLogos);

// =========================================
// CARRUSEL INFINITO DE SERVICIOS
// =========================================
const track = document.querySelector('.carrusel-track');
const btnPrev = document.querySelector('.carrusel-btn.prev');
const btnNext = document.querySelector('.carrusel-btn.next');

// Candado de seguridad para evitar que hagan clics súper rápidos y rompan la animación
let isMoving = false;

function moverDerecha() {
    if (isMoving) return; // Si ya se está moviendo, ignoramos el clic
    isMoving = true;

    // Calculamos el tamaño de la tarjeta y el espacio (gap)
    const tarjeta = track.firstElementChild;
    const anchoTarjeta = tarjeta.offsetWidth;
    const distancia = anchoTarjeta + 20;

    // 1. Encendemos la animación y movemos la pista a la izquierda
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${distancia}px)`;

    
    setTimeout(() => {
        track.style.transition = 'none'; 
        track.appendChild(tarjeta); 
        track.style.transform = 'translateX(0)'; 
        isMoving = false;
    }, 500);
}

function moverIzquierda() {
    if (isMoving) return;
    isMoving = true;

    const tarjeta = track.lastElementChild;
    const anchoTarjeta = track.firstElementChild.offsetWidth;
    const distancia = anchoTarjeta + 20;

    // 1. Truco de magia inverso: movemos la última tarjeta al principio en secreto
    track.style.transition = 'none'; 
    track.prepend(tarjeta);
    track.style.transform = `translateX(-${distancia}px)`;

    // 2. Un instante después, encendemos la animación para que se deslice hacia la pantalla
    setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            isMoving = false;
        }, 500);
    }, 20); 
}

// Escuchar los clics de las flechas
btnNext.addEventListener('click', moverDerecha);
btnPrev.addEventListener('click', moverIzquierda);

// Autoplay automático
let autoplay = setInterval(moverDerecha, 4000);

// Pausar si el usuario pone el mouse encima para leer
const carruselWrapper = document.querySelector('.carrusel-wrapper');
carruselWrapper.addEventListener('mouseenter', () => clearInterval(autoplay));
carruselWrapper.addEventListener('mouseleave', () => {
    autoplay = setInterval(moverDerecha, 4000);
});