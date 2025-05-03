// main.js (Página Principal)

// Guardamos el array de imágenes (si existe en localStorage, lo cargamos; si no, array vacío)
let images = JSON.parse(localStorage.getItem('images')) || [];

// Creamos el header
const crearHeader = () => {
    const header = document.createElement('header');
    header.textContent = 'Galería de Imágenes';
    header.style.backgroundColor = '#333';
    header.style.color = 'white';
    header.style.padding = '1rem';
    header.style.textAlign = 'center';
    return header;
};

// Creamos el footer
const crearFooter = () => {
    const footer = document.createElement('footer');
    footer.textContent = '© 2025 Mi Galería';
    footer.style.backgroundColor = '#333';
    footer.style.color = 'white';
    footer.style.padding = '1rem';
    footer.style.textAlign = 'center';
    footer.style.marginTop = '2rem';
    return footer;
};

// Creamos el sidebar
const crearSidebar = () => {
    const sidebar = document.createElement('aside');
    sidebar.style.width = '200px';
    sidebar.style.padding = '1rem';
    sidebar.style.backgroundColor = '#eee';

    const botonRegistrar = document.createElement('button');
    botonRegistrar.textContent = 'Registrar nueva imagen';
    botonRegistrar.style.width = '100%';

    // Cuando le damos click al botón, nos lleva a la página de registro
    botonRegistrar.addEventListener('click', () => {
        location.href = './register.html';
    });

    sidebar.appendChild(botonRegistrar);
    return sidebar;
};

// Renderizamos la galería usando el array de imágenes
const renderGallery = (images) => {
    const gallery = document.createElement('div');
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    gallery.style.gap = '1rem';
    gallery.style.padding = '1rem';

    images.forEach(img => {
        const contenedor = document.createElement('div');
        contenedor.classList.add('gallery-item');
        contenedor.style.border = '1px solid #ccc';
        contenedor.style.padding = '0.5rem';
        contenedor.style.textAlign = 'center';

        const image = document.createElement('img');
        image.src = img.url;
        image.alt = img.descripcion;
        image.style.width = '100%';
        image.style.height = '150px';
        image.style.objectFit = 'cover';

        const desc = document.createElement('p');
        desc.textContent = img.descripcion;

        contenedor.appendChild(image);
        contenedor.appendChild(desc);

        // Opcional: evento click para agrandar (yo no lo voy a hacer ahora porque es opcional)

        gallery.appendChild(contenedor);
    });

    return gallery;
};

// Esta función arma toda la página principal
const renderPaginaPrincipal = () => {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Limpiamos por si acaso

    const header = crearHeader();
    const sidebar = crearSidebar();
    const gallery = renderGallery(images);
    const footer = crearFooter();

    const mainContent = document.createElement('div');
    mainContent.style.display = 'flex';

    const main = document.createElement('main');
    main.style.flex = '1';
    main.appendChild(gallery);

    mainContent.appendChild(sidebar);
    mainContent.appendChild(main);

    app.appendChild(header);
    app.appendChild(mainContent);
    app.appendChild(footer);
};

// Llamamos a la función para que todo se pinte en pantalla
renderPaginaPrincipal();
