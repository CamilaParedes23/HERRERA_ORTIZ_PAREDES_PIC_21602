class NavSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        aside {
          width: 200px;
          height: 100vh;
          background-color: #1e2a38;
          color: white;
          padding: 1rem;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          padding: 0.5rem 0;
          cursor: pointer;
        }

        li:hover {
          text-decoration: underline;
        }
      </style>

      <aside>
        <h2>Navegación</h2>
        <ul>
          <li>Dashboard</li>
          <li>Recomendaciones</li>
          <li>Educativo</li>
        </ul>
      </aside>
    `;
  }
}

customElements.define('nav-sidebar', NavSidebar);
