document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor principal
    const body = document.body;

    // Crear Header
    //Cración del encabezado en el DOM
    const header = document.createElement('header');
    header.innerHTML = '<h1>Registrar Imagen</h1>';
    header.style.backgroundColor = '#2c3e50';
    header.style.color = 'white';
    header.style.padding = '20px';
    header.style.textAlign = 'center';
    body.appendChild(header);

    // Crear contenedor general con sidebar y main
    //Creación del contenedor principal que contendrá el sidebar y el main
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.minHeight = '80vh';
    body.appendChild(container);

    // Crear Sidebar
    //Creación de la barra lateral (sidebar) con los enlaces de navegación
    const sidebar = document.createElement('aside');
    sidebar.style.width = '200px';
    sidebar.style.backgroundColor = '#ecf0f1';
    sidebar.style.padding = '20px';
    //Enlaces de navegación del sidebar
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
    //Ocupa todo el espacio restante del contenedor principal
    main.style.flex = '1';
    //Estilo de la sección principal
    main.style.padding = '20px';
    container.appendChild(main);

    // Crear formulario de registro
    const form = document.createElement('form');
    //classList para aplicar estilos CSS
    form.classList.add('register-form');
    //Definición del contenido HTML del formulario
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
    //Aquí se agrega el formulario al contenedor principal
    main.appendChild(form);
    //Evento de envío del formulario
    // Cuando se envía el formulario, se ejecuta esta función
    form.addEventListener('submit', function(e) {
        //Evita que se recargue la página al enviar el formulario
        e.preventDefault();
        //Obtención y limpieza de los valores en los campos
        const title = document.getElementById('title').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();

        // Validaciones
        //Aquí se valida que ingrese la url de la imagen  
        if (imageUrl === '') {
            alert('Por favor ingrese la URL de la imagen.');
            return;
        }
        //Aquí se valida que el titulo tenga al menos 3 caracteres
        if (title.length < 3) {
            alert('El título debe tener al menos 3 caracteres.');
            return;
        }
        //Creación del objeto de imagen
        //Aquí se crea un objeto que representa la imagen que será registrada
        const newImage = { title: title, src: imageUrl };
        // Actualización del array en localStorage
        //Recupera el array existente del localStorage o crea uno nuevo si no existe
        const images = JSON.parse(localStorage.getItem('galleryImages')) || [];
        //Aquí se agrega la nueva imagen al array de imágenes
        images.push(newImage);
        //Aquí se guarda el array actualizado en el localStorage
        localStorage.setItem('galleryImages', JSON.stringify(images));
        //Limpia los campos del formulario
        form.reset();

        //Redirección a index.html
        window.location.href = 'index.html'; // Redirección
    });

    // Creación del Footer
    const footer = document.createElement('footer');
    footer.innerHTML = '<p>&copy; Camila Soledad Paredes Panata</p>';
    footer.style.backgroundColor = '#2c3e50';
    footer.style.color = 'white';
    footer.style.padding = '10px';
    footer.style.textAlign = 'center';
    body.appendChild(footer);
});
