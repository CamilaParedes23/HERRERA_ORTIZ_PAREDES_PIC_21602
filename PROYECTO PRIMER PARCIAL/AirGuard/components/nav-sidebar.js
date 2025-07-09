import { setupSidebarNavigation } from './nav-navigation.js';

class NavSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    //Se asegura que los métodos handleKeydown y handleResize mantengan el contexto
    //correcto (this) cuando se usen como listeners
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    //Construye la interfaz HTML y CSS del componente
    this.render();
    //Se agrega los elementos del menú móvil (toggle, overlay, etc)
    this.addEventListeners();
    //Llama al módulo externo para navegar po clic entre secciones
    setupSidebarNavigation(this);  
    //Detecta el modo movil handleResize y ajusta clases CSS
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', this.handleKeydown);
  }

  //Método del ciclo de vida que se ejecuta para removver el componente del DOM
  disconnectedCallback() {
    //Limpia los listeners para evitar fugas de memoria
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('keydown', this.handleKeydown);
  }

  //Determina si el ancho de pantalla es modo movil (menor o igual a 768px)
  handleResize() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.classList.add('mobile-mode');
    } else {
      this.classList.remove('mobile-mode', 'mobile-open');
    }
  }

  //Si el usuario presina Escape y el menú está abierto, lo cierra
  handleKeydown(e) {
    if (e.key === 'Escape' && this.classList.contains('mobile-open')) {
      this.closeMobile();
    }
  }

  //Añade eventos para los botones móviles
  addEventListeners() {
    //Obtiene referencias al botón hamburguesa y al fondo oscurecido
    const mobileToggle = this.shadowRoot.querySelector('.mobile-toggle');
    const mobileOverlay = this.shadowRoot.querySelector('.mobile-overlay');

    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMobile();
      });
    }

    //Si el usuario hace clic fuera del menú (overlay), el menú se cierra
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => {
        this.closeMobile();
      });
    }
  }

  //Renderizado del componente
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Aquí va todo tu CSS (el mismo que enviaste) */
        :host {
          display: block;
          position: sticky;
          top: 0;
          align-self: flex-start;
          z-index: 100;
        }

        /* Botón hamburguesa para móvil */
        .mobile-toggle {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1002;
          background: #1e2a38;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.4rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          width: 45px;
          height: 45px;
          display: none;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .mobile-toggle:hover {
          background: #2c3e50;
          transform: scale(1.05);
        }

        aside {
          width: 240px;
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
          overflow-y: auto;
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

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          backdrop-filter: blur(2px);
          display: none;
          pointer-events: auto;
        }

        @media (max-width: 1024px) {
          aside {
            width: 200px;
          }
          h2 {
            font-size: 1.1rem;
          }
          li {
            padding: 0.7rem 0.8rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: flex !important;
          }
          aside {
            position: fixed;
            top: 0;
            left: -100%;
            width: 280px;
            height: 100vh;
            z-index: 1000;
            border-radius: 0 8px 8px 0;
            transform: translateX(0);
            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          :host(.mobile-open) aside {
            left: 0;
            box-shadow: 
              8px 0 30px rgba(0,0,0,0.3),
              inset -1px 0 0 rgba(255,255,255,0.1);
          }
          :host(.mobile-open) .mobile-overlay {
            display: block;
          }
        }

        @media (max-width: 480px) {
          aside {
            width: 100vw !important;
            border-radius: 0;
          }
          li {
            padding: 1rem;
            font-size: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          h2 {
            text-align: left;
            padding: 1rem 0;
            margin-bottom: 1rem;
          }
        }
      </style>

      <button class="mobile-toggle" aria-label="Abrir menú">☰</button>
      <div class="mobile-overlay"></div>
      <aside>
        <h2>Navegación</h2>
        <ul>
          <li data-section="dashboard" class="active">Dashboard</li>
          <li data-section="recomendaciones">Recomendaciones</li>
          <li data-section="educativo">Educativo</li>
        </ul>
      </aside>
    `;
  }

  //Métodos del control móvil 
  toggleMobile() {
    this.classList.toggle('mobile-open');
  }

  closeMobile() {
    this.classList.remove('mobile-open');
  }

  openMobile() {
    this.classList.add('mobile-open');
  }
}

customElements.define('nav-sidebar', NavSidebar);
