class DataCrud extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.recomendaciones = JSON.parse(localStorage.getItem('recomendaciones')) || [];
    this.editingIndex = -1;
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    const addBtn = this.shadowRoot.querySelector('#addBtn');
    const input = this.shadowRoot.querySelector('#recoInput');
    const searchInput = this.shadowRoot.querySelector('#searchInput');
    const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');

    // Agregar/Actualizar
    addBtn.addEventListener('click', () => {
      if (input.value.trim()) {
        if (this.editingIndex === -1) {
          // Crear nuevo
          this.recomendaciones.push({
            id: Date.now(),
            text: input.value.trim(),
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
          });
        } else {
          // Actualizar existente
          this.recomendaciones[this.editingIndex].text = input.value.trim();
          this.recomendaciones[this.editingIndex].updatedAt = new Date().toLocaleString();
          this.cancelEdit();
        }
        this.updateStorage();
        input.value = '';
        this.renderList();
        this.showNotification('¡Operación exitosa!', 'success');
      }
    });

    // Cancelar edición
    cancelBtn.addEventListener('click', () => {
      this.cancelEdit();
    });

    // Búsqueda
    searchInput.addEventListener('input', (e) => {
      this.filterList(e.target.value);
    });

    // Enter para agregar
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addBtn.click();
      }
    });
  }

  updateStorage() {
    localStorage.setItem('recomendaciones', JSON.stringify(this.recomendaciones));
  }

  remove(index) {
    if (confirm('¿Estás seguro de que quieres eliminar esta recomendación?')) {
      this.recomendaciones.splice(index, 1);
      this.updateStorage();
      this.renderList();
      this.showNotification('Elemento eliminado', 'success');
    }
  }

  edit(index) {
    this.editingIndex = index;
    const input = this.shadowRoot.querySelector('#recoInput');
    const addBtn = this.shadowRoot.querySelector('#addBtn');
    const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');
    
    input.value = this.recomendaciones[index].text;
    addBtn.textContent = 'Actualizar';
    addBtn.className = 'btn btn-warning';
    cancelBtn.style.display = 'inline-block';
    
    // Scroll al input y focus
    input.scrollIntoView({ behavior: 'smooth' });
    input.focus();
  }

  cancelEdit() {
    this.editingIndex = -1;
    const input = this.shadowRoot.querySelector('#recoInput');
    const addBtn = this.shadowRoot.querySelector('#addBtn');
    const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');
    
    input.value = '';
    addBtn.textContent = 'Agregar';
    addBtn.className = 'btn btn-primary';
    cancelBtn.style.display = 'none';
  }

  filterList(searchTerm) {
    const items = this.shadowRoot.querySelectorAll('.list-item');
    items.forEach(item => {
      const text = item.querySelector('.item-text').textContent.toLowerCase();
      if (text.includes(searchTerm.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    this.shadowRoot.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  renderList() {
    const list = this.shadowRoot.querySelector('#recoList');
    const emptyState = this.shadowRoot.querySelector('#emptyState');
    const itemCount = this.shadowRoot.querySelector('#itemCount');
    
    list.innerHTML = '';

    if (this.recomendaciones.length === 0) {
      emptyState.style.display = 'block';
      itemCount.textContent = '0 recomendaciones';
      return;
    }

    emptyState.style.display = 'none';
    itemCount.textContent = `${this.recomendaciones.length} recomendación${this.recomendaciones.length !== 1 ? 'es' : ''}`;

    this.recomendaciones.forEach((rec, index) => {
      const li = document.createElement('li');
      li.className = 'list-item';
      
      li.innerHTML = `
        <div class="item-content">
          <div class="item-text">${rec.text}</div>
          <div class="item-meta">
            <small>Creado: ${rec.createdAt}</small>
            ${rec.updatedAt !== rec.createdAt ? `<small>Actualizado: ${rec.updatedAt}</small>` : ''}
          </div>
        </div>
        <div class="item-actions">
          <button class="btn btn-sm btn-secondary edit-btn" data-index="${index}">
            ✏️ Editar
          </button>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">
            🗑️ Eliminar
          </button>
        </div>
      `;

      // Eventos para los botones
      const editBtn = li.querySelector('.edit-btn');
      const deleteBtn = li.querySelector('.delete-btn');
      
      editBtn.addEventListener('click', () => this.edit(index));
      deleteBtn.addEventListener('click', () => this.remove(index));

      list.appendChild(li);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        .crud-container {
          max-width: 800px;
          margin: 0 auto;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stats {
          background: rgba(255,255,255,0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          display: inline-block;
          backdrop-filter: blur(10px);
        }

        .form-section {
          background: rgba(255,255,255,0.1);
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .form-control:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .form-control::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .btn-group {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn-primary {
          background: linear-gradient(45deg, #4CAF50, #45a049);
          color: white;
        }

        .btn-warning {
          background: linear-gradient(45deg, #ff9800, #e68900);
          color: white;
        }

        .btn-secondary {
          background: linear-gradient(45deg, #6c757d, #5a6268);
          color: white;
        }

        .btn-danger {
          background: linear-gradient(45deg, #f44336, #da190b);
          color: white;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        #cancelBtn {
          display: none;
        }

        .search-section {
          margin-bottom: 1.5rem;
        }

        .list-section {
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .list-header h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        #recoList {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .list-item {
          background: rgba(255,255,255,0.1);
          margin-bottom: 1rem;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .list-item:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .item-content {
          flex: 1;
          margin-right: 1rem;
        }

        .item-text {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .item-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .item-meta small {
          color: rgba(255,255,255,0.7);
          font-size: 0.8rem;
        }

        .item-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: rgba(255,255,255,0.7);
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          z-index: 1000;
          transform: translateX(400px);
          transition: transform 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .notification.show {
          transform: translateX(0);
        }

        .notification.success {
          background: linear-gradient(45deg, #4CAF50, #45a049);
        }

        .notification.error {
          background: linear-gradient(45deg, #f44336, #da190b);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .crud-container {
            margin: 1rem;
            padding: 1rem;
          }

          .list-item {
            flex-direction: column;
            gap: 1rem;
          }

          .item-content {
            margin-right: 0;
          }

          .item-actions {
            align-self: stretch;
          }

          .btn-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .header h2 {
            font-size: 1.5rem;
          }

          .item-actions {
            flex-direction: column;
          }
        }
      </style>

      <div class="crud-container">
        <div class="header">
          <h2>📝 Gestor de Recomendaciones</h2>
          <div class="stats">
            <span id="itemCount">0 recomendaciones</span>
          </div>
        </div>

        <div class="form-section">
          <div class="form-group">
            <input 
              type="text" 
              id="recoInput" 
              class="form-control" 
              placeholder="✨ Escribe tu recomendación aquí..."
              maxlength="200"
            >
          </div>
          <div class="btn-group">
            <button id="addBtn" class="btn btn-primary">
              ➕ Agregar
            </button>
            <button id="cancelBtn" class="btn btn-secondary">
              ❌ Cancelar
            </button>
          </div>
        </div>

        <div class="search-section">
          <input 
            type="text" 
            id="searchInput" 
            class="form-control" 
            placeholder="🔍 Buscar recomendaciones..."
          >
        </div>

        <div class="list-section">
          <div class="list-header">
            <h3>📋 Mis Recomendaciones</h3>
          </div>
          
          <div id="emptyState" class="empty-state" style="display: none;">
            <div class="empty-state-icon">📝</div>
            <h3>¡Aún no hay recomendaciones!</h3>
            <p>Agrega tu primera recomendación usando el formulario de arriba.</p>
          </div>
          
          <ul id="recoList"></ul>
        </div>
      </div>
    `;

    this.renderList();
  }
}

customElements.define('data-crud', DataCrud);