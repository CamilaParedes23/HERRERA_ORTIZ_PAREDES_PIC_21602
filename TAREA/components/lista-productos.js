import { productos, mostrarVista } from '../app.js';

class ListaProductos extends HTMLElement {
  constructor() {
    super();
    // Creamos el Shadow DOM para encapsular el estilo y HTML
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Mostramos la lista de productos al cargarse el componente
    this.render();
  }

  // Método para eliminar un producto del array
  eliminarProducto = (id) => {
    const index = productos.findIndex(p => p.id == id);
    if (index !== -1) {
        // Eliminamos del array
      productos.splice(index, 1);
      // Volvemos a renderizar la tabla
      this.render();
    }
  };

  // Renderiza la tabla de productos
  render = () => {
    this.shadowRoot.innerHTML = `
            <style>
        table {
          width: 90%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        th, td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }

        th {
          background-color: #2980b9;
          color: white;
        }

        tr:hover {
          background-color: #f0f8ff;
        }

        button {
          background-color: #2ecc71;
          border: none;
          color: white;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 5px;
          font-weight: bold;
        }

        button.eliminar {
          background-color: #e74c3c;
        }

        button:hover {
          opacity: 0.9;
        }
      </style>

      <table>
        <tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Descripción</th><th>Acciones</th></tr>
        ${productos.map(p => `
          <tr>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.cantidad}</td>
            <td>${p.descripcion}</td>
            <td>
              <button data-id="${p.id}" class="editar">Editar</button>
              <button data-id="${p.id}" class="eliminar">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </table>
    `;

    // Evento para el botón "Editar"
    this.shadowRoot.querySelectorAll('.editar').forEach(btn =>
      btn.addEventListener('click', e => {
        const id = e.target.dataset.id;
        mostrarVista('editar', id);
      })
    );

    // Evento para el botón "Eliminar"
    this.shadowRoot.querySelectorAll('.eliminar').forEach(btn =>
      btn.addEventListener('click', e => {
        const id = e.target.dataset.id;
        this.eliminarProducto(id);
      })
    );
  };
}

// Definimos el nuevo elemento personalizado
customElements.define('lista-productos', ListaProductos);
