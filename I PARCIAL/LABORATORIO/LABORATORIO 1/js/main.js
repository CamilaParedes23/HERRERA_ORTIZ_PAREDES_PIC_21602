document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor principal
    const body = document.body;

    // Creación de Header
    //Creación del elemento header en el DOM
    const header = document.createElement('header');
    //Titulo del header
    header.innerHTML = '<h1>Galería Principal / LABORATORIO 1</h1>';
    //Estilo del header
    header.style.backgroundColor = '#2c3e50';
    header.style.color = 'white';
    header.style.padding = '20px';
    header.style.textAlign = 'center';
    //Agregar el header al body
    body.appendChild(header);

    // Crear contenedor general con sidebar y main
    //Contenedor principal
    const container = document.createElement('div');
    //Estilo del contenedor principal
    container.style.display = 'flex';
    container.style.minHeight = '80vh';
    //Agregar el contenedor al body
    body.appendChild(container);

    // Crear Sidebar (Menú lateral)
    //Creación del elemento aside en el DOM
    const sidebar = document.createElement('aside');
    //Estilo del sidebar
    sidebar.style.width = '200px';
    sidebar.style.backgroundColor = '#ecf0f1';
    sidebar.style.padding = '20px';
    //Contenido del sidebar
    //Dos opciones de menú: Inicio y Registrar
    sidebar.innerHTML = `
        <h3>Menú</h3>
        <ul style="list-style: none; padding: 0;">
            <li><a href="index.html">Inicio</a></li>
            <li><a href="register.html">Registrar</a></li>
        </ul>
    `;
    //Agregar el sidebar al contenedor principal
    container.appendChild(sidebar);

    // Crear Main (contenedor de galería)
    const main = document.createElement('main');
    main.style.flex = '1';
    main.style.padding = '20px';
    container.appendChild(main);

    // Crear contenedor de la galería dde imágenes
    const galleryContainer = document.createElement('div');
    //Asignación de clase al contenedor de la galería
    galleryContainer.classList.add('gallery-container');
    main.appendChild(galleryContainer);

    // Cargar imágenes de localStorage y mostrarlas
    const images = JSON.parse(localStorage.getItem('galleryImages')) || [];
    //Recorer el array de imágenes y 
    // crear un elemento div para cada imagen
    images.forEach(imageData => {
        //Contendor de cada imagen
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = imageData.src; //URL de la imagen
        img.alt = imageData.title; //Texto alternativo de la imagen

        const title = document.createElement('p'); //Título de la imagen
        title.textContent = imageData.title; //Texto del título
        //Ensable de la imagen y el título
        galleryItem.appendChild(img);
        galleryItem.appendChild(title);
        galleryContainer.appendChild(galleryItem);
    });

    // Crear Footer
    const footer = document.createElement('footer');
    footer.innerHTML = '<p>&copy; Camila Soledad Paredes Panata</p>';
    footer.style.backgroundColor = '#2c3e50';
    footer.style.color = 'white';
    footer.style.padding = '10px';
    footer.style.textAlign = 'center';
    body.appendChild(footer);
});
