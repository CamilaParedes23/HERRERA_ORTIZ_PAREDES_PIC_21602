class FooterApp extends HTMLElement {
  constructor() {
    super();
    // Creamos el Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Renderizamos el contenido cuando se carga el componente
    this.render();
  }

  // Renderiza el footer con enlaces a redes sociales
  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #2c3e50;
          color: white;
          padding: 15px;
          text-align: center;
          font-size: 14px;
          margin-top: 40px;
        }

        a {
          color: #1abc9c;
          margin: 0 10px;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      </style>

      <footer>
        © 2025 Todos los derechos reservados.
        <br/>
        <a href="https://github.com/CamilaParedes23/PIC_21602" target="_blank">GitHub</a>
        <a href="http://www.linkedin.com/in/bryan-andres-ortiz-tomalo-a78062271" target="_blank">LinkedIn</a>
      </footer>
    `;
  };
}

// Definimos el nuevo elemento personalizado
customElements.define('footer-app', FooterApp);
