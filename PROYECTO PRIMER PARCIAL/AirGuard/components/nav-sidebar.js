class NavSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.classList.add('mobile-mode');
    } else {
      this.classList.remove('mobile-mode', 'mobile-open');
    }
  }

  addEventListeners() {
    const menuItems = this.shadowRoot.querySelectorAll('li[data-section]');
    const mobileToggle = this.shadowRoot.querySelector('.mobile-toggle');
    const mobileOverlay = this.shadowRoot.querySelector('.mobile-overlay');
    
    // Eventos del menú
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Remover clase activa de todos los elementos
        menuItems.forEach(i => i.classList.remove('active'));
        // Agregar clase activa al elemento clickeado
        e.target.classList.add('active');
        
        // Cerrar menú móvil después de seleccionar
        if (window.innerWidth <= 768) {
          this.closeMobile();
        }
        
        // Emitir evento personalizado para comunicación con otros componentes
        const customEvent = new CustomEvent('sidebar-navigation', {
          detail: { section: e.target.dataset.section },
          bubbles: true
        });
        this.dispatchEvent(customEvent);
      });
    });

    // Evento botón hamburguesa
    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMobile();
      });
    }

    // Cerrar al hacer clic en el overlay
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => {
        this.closeMobile();
      });
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.classList.contains('mobile-open')) {
        this.closeMobile();
      }
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

        /* Overlay para cerrar el menú móvil */
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

        /* Responsive - Tablet */
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

        /* Responsive - Móvil */
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

        /* Móvil pequeño */
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
          <li data-section="dashboard">Dashboard</li>
          <li data-section="recomendaciones">Recomendaciones</li>
          <li data-section="educativo">Educativo</li>
        </ul>
      </aside>
    `;
  }

  // Métodos para controlar el menú móvil
  toggleMobile() {
    console.log('Toggle mobile called'); // Debug
    console.log('Current classes:', this.className); // Debug
    this.classList.toggle('mobile-open');
    console.log('New classes:', this.className); // Debug
  }

  closeMobile() {
    this.classList.remove('mobile-open');
  }

  openMobile() {
    this.classList.add('mobile-open');
  }
}

customElements.define('nav-sidebar', NavSidebar);