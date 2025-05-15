import { mostrarVista } from '../app.js';

class MenuNavegacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', e => {
        e.preventDefault();
        mostrarVista(e.target.dataset.vista);
      })
    );
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background-color: #2c3e50;
          padding: 15px;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        a {
          color: white;
          font-weight: bold;
          text-decoration: none;
          font-size: 16px;
          padding: 8px 12px;
          border-radius: 5px;
          transition: background 0.3s;
          cursor: pointer;
        }

        a:hover {
          background-color: #34495e;
        }
      </style>
      <nav>
        <a data-vista="inicio">Inicio</a>
        <a data-vista="registro">Gestión Productos</a>
        <a data-vista="lista">Lista de Productos</a>
        <a data-vista="acerca">Acerca de</a>
      </nav>
    `;
  };
}

customElements.define('menu-navegacion', MenuNavegacion);
