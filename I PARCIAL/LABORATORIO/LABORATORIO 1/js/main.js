// main.js

document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    // Crear Header
    const header = document.createElement('header');
    header.innerHTML = '<h1>Galería Principal / LABORATORIO 1</h1>';
    header.style.backgroundColor = '#2c3e50';
    header.style.color = 'white';
    header.style.padding = '20px';
    header.style.textAlign = 'center';
    body.appendChild(header);

    // Crear contenedor general con sidebar y main
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.minHeight = '80vh';
    body.appendChild(container);

    // Crear Sidebar
    const sidebar = document.createElement('aside');
    sidebar.style.width = '200px';
    sidebar.style.backgroundColor = '#ecf0f1';
    sidebar.style.padding = '20px';
    sidebar.innerHTML = `
        <h3>Menú</h3>
        <ul style="list-style: none; padding: 0;">
            <li><a href="index.html">Inicio</a></li>
            <li><a href="register.html">Registrar</a></li>
        </ul>
    `;
    container.appendChild(sidebar);

    // Crear Main (contenedor de galería)
    const main = document.createElement('main');
    main.style.flex = '1';
    main.style.padding = '20px';
    container.appendChild(main);

    // Crear contenedor de la galería
    const galleryContainer = document.createElement('div');
    galleryContainer.classList.add('gallery-container');
    main.appendChild(galleryContainer);

    // Cargar imágenes de localStorage y mostrarlas
    const images = JSON.parse(localStorage.getItem('galleryImages')) || [];

    images.forEach(imageData => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.title;

        const title = document.createElement('p');
        title.textContent = imageData.title;

        galleryItem.appendChild(img);
        galleryItem.appendChild(title);
        galleryContainer.appendChild(galleryItem);
    });

    // Crear Footer
    const footer = document.createElement('footer');
    footer.innerHTML = '<p>&copy; 2025 Galería Dinámica</p>';
    footer.style.backgroundColor = '#2c3e50';
    footer.style.color = 'white';
    footer.style.padding = '10px';
    footer.style.textAlign = 'center';
    body.appendChild(footer);
});
