// Este archivo se encarga de crear la página para registrar una nueva imagen

// Función para crear el header (igual que en index, para que las páginas sean similares)
const crearHeader = () => {
    const header = document.createElement('header');
    header.textContent = 'Registro de Imagen';
    header.style.backgroundColor = '#4CAF50';
    header.style.color = 'white';
    header.style.padding = '10px';
    header.style.textAlign = 'center';
    return header;
};

// Función para crear el footer (también igual al index para que se vea bonito)
const crearFooter = () => {
    const footer = document.createElement('footer');
    footer.textContent = '© 2025 - Laboratorio 1';
    footer.style.backgroundColor = '#4CAF50';
    footer.style.color = 'white';
    footer.style.padding = '10px';
    footer.style.textAlign = 'center';
    return footer;
};

// Esta función crea el formulario para registrar la imagen
const crearFormulario = () => {
    const form = document.createElement('form');
    form.classList.add('formulario');

    // Campo para ingresar la URL de la imagen
    const labelUrl = document.createElement('label');
    labelUrl.textContent = 'URL de la imagen:';
    const inputUrl = document.createElement('input');
    inputUrl.type = 'text';
    inputUrl.required = true;

    // Campo para ingresar la descripción
    const labelDesc = document.createElement('label');
    labelDesc.textContent = 'Descripción:';
    const inputDesc = document.createElement('input');
    inputDesc.type = 'text';
    inputDesc.required = true;
    inputDesc.minLength = 3; // La consigna dice mínimo 3 caracteres

    // Botón para enviar
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Registrar Imagen';

    // Los agrego al formulario
    form.appendChild(labelUrl);
    form.appendChild(inputUrl);
    form.appendChild(document.createElement('br'));

    form.appendChild(labelDesc);
    form.appendChild(inputDesc);
    form.appendChild(document.createElement('br'));

    form.appendChild(submitBtn);

    // Manejar el evento submit (cuando el usuario envía el formulario)
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Esto evita que la página se recargue

        const url = inputUrl.value.trim();
        const descripcion = inputDesc.value.trim();

        // Validar que los campos no estén vacíos
        if (url === '' || descripcion.length < 3) {
            alert('Por favor, ingrese una URL y una descripción de al menos 3 caracteres.');
            return;
        }

        // Recupero las imágenes que ya estaban guardadas (si no hay, pongo un array vacío)
        const imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];

        // Creo el nuevo objeto con la imagen
        const nuevaImagen = { url, descripcion };

        // Lo agrego al array
        imagenes.push(nuevaImagen);

        // Guardo otra vez el array actualizado en el localStorage
        localStorage.setItem('imagenes', JSON.stringify(imagenes));

        // Redirijo a la página principal para que se vea la imagen nueva
        window.location.href = 'index.html';
    });

    return form;
};

// Esta función arma toda la página (igual que hicimos en index)
const setupRegisterPage = () => {
    const app = document.getElementById('app');

    const header = crearHeader();
    const form = crearFormulario();
    const footer = crearFooter();

    app.appendChild(header);
    app.appendChild(form);
    app.appendChild(footer);
};

// Llamo a la función para que se cree la página cuando se abre
setupRegisterPage();
