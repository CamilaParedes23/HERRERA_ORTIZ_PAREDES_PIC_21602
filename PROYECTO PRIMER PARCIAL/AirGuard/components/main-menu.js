class MainMenu extends HTMLElement {
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
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          color: white;
          font-family: 'Segoe UI', sans-serif;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        ul {
          display: flex;
          list-style: none;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }

        li {
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        li:hover {
          transform: scale(1.05);
          text-decoration: underline;
        }

        .integrantes {
          font-size: 0.9rem;
          text-align: right;
        }
      </style>

      <nav>
        <ul>
          <li>Inicio</li>
          <li>Acerca de</li>
          <li>Educate</li>
          <li>Login</li>
        </ul>
        <div class="integrantes">
          <strong>Integrantes:</strong><br>
          Herrera Anahy<br>
          Ortiz Bryan<br>
          Paredes Camila
        </div>
      </nav>
    `;
  }
}

customElements.define('main-menu', MainMenu);
