/*-----------------------------------------*\
  # NAVEGACIÓN MÓVIL
\*-----------------------------------------*/

'use strict';

// Elementos del menú móvil
const nav = document.querySelector('.mobile-nav');
const navMenuBtn = document.querySelector('.nav-menu-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');

// Alternar visibilidad del menú móvil
const toggleMobileNav = () => nav.classList.toggle('active');

// Event listeners para botones del menú
navMenuBtn.addEventListener('click', toggleMobileNav);
navCloseBtn.addEventListener('click', toggleMobileNav);

/*-----------------------------------------*\
  # CAMBIO DE TEMA CON PERSISTENCIA
\*-----------------------------------------*/

// Botones de cambio de tema
const themeBtns = document.querySelectorAll('.theme-btn');

// Función para guardar la preferencia de tema
const saveThemePreference = (isDarkMode) => {
    localStorage.setItem('darkMode', isDarkMode);
};

// Función para cargar la preferencia de tema
const loadThemePreference = () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (darkMode) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeBtns.forEach(btn => {
            btn.classList.add('dark');
            btn.classList.remove('light');
        });
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeBtns.forEach(btn => {
            btn.classList.add('light');
            btn.classList.remove('dark');
        });
    }

    return darkMode;
};

// Función para alternar entre temas claro/oscuro
const toggleTheme = () => {
    const isDarkMode = document.body.classList.contains('light-theme');

    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    themeBtns.forEach(btn => {
        btn.classList.toggle('light');
        btn.classList.toggle('dark');
    });

    saveThemePreference(isDarkMode);
};

// Cargar preferencia al iniciar
loadThemePreference();

// Añadir event listeners a todos los botones de tema
themeBtns.forEach(btn => btn.addEventListener('click', toggleTheme));

/*-----------------------------------------*\
  # ANIMACIÓN DE LÍNEA DE TIEMPO
\*-----------------------------------------*/

const initTimelineAnimation = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const checkItemVisibility = () => {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top + scrollPosition;
            const isVisible = (itemPosition < scrollPosition + windowHeight * 0.75);

            if (isVisible) {
                item.classList.add('visible');
            }
        });
    };

    // Optimización del evento scroll con debounce
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(checkItemVisibility, 50);
    }, { passive: true });

    // Comprobar visibilidad al cargar
    checkItemVisibility();
};

/*-----------------------------------------*\
  # INICIALIZACIÓN
\*-----------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    initTimelineAnimation();
});