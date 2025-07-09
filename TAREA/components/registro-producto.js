import { productos, mostrarVista } from '../app.js';

class RegistroProducto extends HTMLElement {
  constructor() {
    super();
    // Creamos el Shadow DOM para encapsular el estilo y HTML
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Llamamos al método que renderiza el contenido
    this.render();

    // Escuchamos el evento submit del formulario
    this.shadowRoot.querySelector('form').addEventListener('submit', e => {
      // Evita que se recargue la página
        e.preventDefault();

      // Obtenemos los valores ingresados por el usuario
      const nombre = this.shadowRoot.getElementById('nombre').value.trim();
      const precio = parseFloat(this.shadowRoot.getElementById('precio').value);
      const cantidad = parseInt(this.shadowRoot.getElementById('cantidad').value);
      const descripcion = this.shadowRoot.getElementById('descripcion').value.trim();

      // Validamos que los campos estén completos y correctos
      if (!nombre || isNaN(precio) || isNaN(cantidad)) {
        alert('Por favor, complete los campos correctamente.');
        return;
      }
      // Verificamos si el producto ya existe
      // Agregamos el producto al array global
      productos.push({ id: Date.now(), nombre, precio, cantidad, descripcion });
      alert('Producto registrado.');

      // Cambiamos a la vista de lista de productos
      mostrarVista('lista');
    });
  }

  // Método para renderizar el formulario
  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 350px;
        }

        input, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

        button {
          background-color: #2980b9;
          color: white;
          border: none;
          padding: 12px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #3498db;
        }
      </style>

      <form>
        <input type="text" id="nombre" placeholder="Nombre" required />
        <input type="number" id="precio" placeholder="Precio" required />
        <input type="number" id="cantidad" placeholder="Cantidad" required />
        <textarea id="descripcion" placeholder="Descripción"></textarea>
        <!-- Botón de registro -->
        <button type="submit">Registrar</button>
      </form>
    `;
  };
}

// Definimos el nuevo elemento personalizado
customElements.define('registro-producto', RegistroProducto);
