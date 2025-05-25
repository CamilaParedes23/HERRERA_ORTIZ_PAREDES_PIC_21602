class NavSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const menuItems = this.shadowRoot.querySelectorAll('li[data-section]');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Remover clase activa de todos los elementos
        menuItems.forEach(i => i.classList.remove('active'));
        // Agregar clase activa al elemento clickeado
        e.target.classList.add('active');
        
        // Emitir evento personalizado para comunicación con otros componentes
        const customEvent = new CustomEvent('sidebar-navigation', {
          detail: { section: e.target.dataset.section },
          bubbles: true
        });
        this.dispatchEvent(customEvent);
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          align-self: flex-start;
        }

        aside {
          width: 200px;
          min-height: 100vh;
          background: linear-gradient(135deg, #1e2a38 0%, #2c3e50 100%);
          color: white;
          padding: 1.5rem 1rem;
          box-shadow: 
            2px 0 10px rgba(0,0,0,0.15),
            inset -1px 0 0 rgba(255,255,255,0.1);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          border-radius: 0 8px 8px 0;
          transition: all 0.3s ease;
        }

        aside:hover {
          box-shadow: 
            4px 0 20px rgba(0,0,0,0.2),
            inset -1px 0 0 rgba(255,255,255,0.1);
        }

        h2 {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          text-align: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          background: linear-gradient(45deg, #3498db, #2980b9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          padding: 0.8rem 1rem;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #3498db, #2980b9);
          transition: width 0.3s ease;
          z-index: -1;
        }

        li:hover {
          background-color: rgba(52, 152, 219, 0.1);
          transform: translateX(4px);
          color: #3498db;
        }

        li:hover::before {
          width: 4px;
        }

        li.active {
          background: linear-gradient(90deg, rgba(52, 152, 219, 0.2), rgba(41, 128, 185, 0.1));
          color: #3498db;
          font-weight: 500;
          border-left: 3px solid #3498db;
        }

        li:active {
          transform: translateX(2px) scale(0.98);
        }

        /* Iconos para cada elemento del menú */
        li[data-section="dashboard"]::after {
          content: "📊";
          float: right;
        }

        li[data-section="recomendaciones"]::after {
          content: "💡";
          float: right;
        }

        li[data-section="educativo"]::after {
          content: "📚";
          float: right;
        }

        /* Responsive */
        @media (max-width: 768px) {
          aside {
            width: 100%;
            position: fixed;
            top: 0;
            left: -100%;
            z-index: 1000;
            transition: left 0.3s ease;
            border-radius: 0;
          }

          :host(.mobile-open) aside {
            left: 0;
          }
        }
      </style>

      <aside>
        <h2>Navegación</h2>
        <ul>
          <li data-section="dashboard">Dashboard</li>
          <li data-section="recomendaciones">Recomendaciones</li>
          <li data-section="educativo">Educativo</li>
        </ul>
      </aside>
    `;
  }

  // Método para abrir/cerrar en móvil
  toggleMobile() {
    this.classList.toggle('mobile-open');
  }
}

customElements.define('nav-sidebar', NavSidebar);