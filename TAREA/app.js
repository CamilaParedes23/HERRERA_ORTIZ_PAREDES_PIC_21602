//Importación de todos los componentes personalizados
import './components/menu-navegacion.js';
import './components/registro-producto.js';
import './components/lista-productos.js';
import './components/editar-producto.js';
import './components/footer-app.js';

// Array global que mantiene los productos en memoria
export const productos = [];

// Referencia al div donde se cargarán los componentes dinámicamente
const contenido = document.getElementById('contenido');

// Función para cambiar la vista en función de la opción seleccionada
export const mostrarVista = (vista, id = null) => {
  switch (vista) {
    case 'inicio':
        //mensaje de bienvenida
      contenido.innerHTML = '<h2>Bienvenido al sistema de gestión de productos</h2>';
      break;
    case 'registro':
        // Cargar el componente de registro de productos
      contenido.innerHTML = '<registro-producto></registro-producto>';
      break;
    case 'lista':
        // Carga el listado de productos
      contenido.innerHTML = '<lista-productos></lista-productos>';
      break;
    case 'editar':
        // Carga el componente para editar un producto específico
      contenido.innerHTML = `<editar-producto id-producto="${id}"></editar-producto>`;
      break;
    case 'acerca':
        // Vista con nombres del equipo
      contenido.innerHTML = '<p>Integrantes: Herrera Anahy, Ortiz Bryan y Paredes Camila</p>';
      break;
  }
};
