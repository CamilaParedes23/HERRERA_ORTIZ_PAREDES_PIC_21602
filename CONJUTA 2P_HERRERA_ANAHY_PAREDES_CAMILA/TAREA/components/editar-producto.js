import { productos, mostrarVista } from '../app.js';

class EditarProducto extends HTMLElement {
  constructor() {
    super();
    // Creamos el Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    //ID del producto
    // Obtenemos el ID recibido como atributo
    const id = this.getAttribute('id-producto');
    // Buscamos el producto en el array
    this.producto = productos.find(p => p.id == id);
    this.render();

    // Manejamos el evento de envío del formulario
    this.shadowRoot.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();

      // Actualizamos los valores del producto
      this.producto.nombre = this.shadowRoot.getElementById('nombre').value.trim();
      this.producto.precio = parseFloat(this.shadowRoot.getElementById('precio').value);
      this.producto.cantidad = parseInt(this.shadowRoot.getElementById('cantidad').value);
      this.producto.descripcion = this.shadowRoot.getElementById('descripcion').value.trim();
      alert('Producto actualizado');

      // Redirigimos a la lista
      mostrarVista('lista');
    });
  }

  // Renderiza el formulario con datos precargados
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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        <input type="text" id="nombre" value="${this.producto.nombre}" />
        <input type="number" id="precio" value="${this.producto.precio}" />
        <input type="number" id="cantidad" value="${this.producto.cantidad}" />
        <textarea id="descripcion">${this.producto.descripcion}</textarea>
        <button type="submit">Actualizar</button>
      </form>
    `;
  };
}

// Definimos el nuevo elemento personalizado
customElements.define('editar-producto', EditarProducto);
