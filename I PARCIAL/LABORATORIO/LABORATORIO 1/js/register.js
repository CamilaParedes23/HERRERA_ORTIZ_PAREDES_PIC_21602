document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    // Crear Header
    const header = document.createElement('header');
    header.innerHTML = '<h1>Registrar Imagen</h1>';
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

    // Crear Main (contenedor del formulario)
    const main = document.createElement('main');
    main.style.flex = '1';
    main.style.padding = '20px';
    container.appendChild(main);

    // Crear formulario de registro
    const form = document.createElement('form');
    form.classList.add('register-form');

    form.innerHTML = `
        <div class="form-row">
            <label for="title">Título:</label>
            <input type="text" id="title" name="title" required>
        </div>

        <div class="form-row">
            <label for="imageUrl">URL de la Imagen:</label>
            <input type="url" id="imageUrl" name="imageUrl" required>
        </div>

        <button type="submit">Registrar Imagen</button>
    `;

    main.appendChild(form);

    // Guardar imagen al enviar formulario 
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();

        // Validaciones
        if (imageUrl === '') {
            alert('Por favor ingrese la URL de la imagen.');
            return;
        }

        if (title.length < 3) {
            alert('El título debe tener al menos 3 caracteres.');
            return;
        }

        const newImage = { title: title, src: imageUrl };

        const images = JSON.parse(localStorage.getItem('galleryImages')) || [];
        images.push(newImage);
        localStorage.setItem('galleryImages', JSON.stringify(images));

        alert('Imagen registrada con éxito!');
        form.reset();
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
