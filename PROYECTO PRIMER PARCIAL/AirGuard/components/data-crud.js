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

    addBtn.addEventListener('click', () => {
      if (input.value.trim()) {
        if (this.editingIndex === -1) {
          this.recomendaciones.push({
            id: Date.now(),
            text: input.value.trim(),
            createdAt: new Date().toLocaleString()
          });
        } else {
          this.recomendaciones[this.editingIndex].text = input.value.trim();
          this.cancelEdit();
        }
        this.updateStorage();
        input.value = '';
        this.renderList();
      }
    });

    cancelBtn.addEventListener('click', () => {
      this.cancelEdit();
    });

    searchInput.addEventListener('input', (e) => {
      this.filterList(e.target.value);
    });

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
    if (confirm('¿Eliminar esta recomendación?')) {
      this.recomendaciones.splice(index, 1);
      this.updateStorage();
      this.renderList();
    }
  }

  edit(index) {
    this.editingIndex = index;
    const input = this.shadowRoot.querySelector('#recoInput');
    const addBtn = this.shadowRoot.querySelector('#addBtn');
    const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');
    
    input.value = this.recomendaciones[index].text;
    addBtn.textContent = 'Actualizar';
    cancelBtn.style.display = 'inline-block';
    input.focus();
  }

  cancelEdit() {
    this.editingIndex = -1;
    const input = this.shadowRoot.querySelector('#recoInput');
    const addBtn = this.shadowRoot.querySelector('#addBtn');
    const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');
    
    input.value = '';
    addBtn.textContent = 'Agregar';
    cancelBtn.style.display = 'none';
  }

  filterList(searchTerm) {
    const items = this.shadowRoot.querySelectorAll('.list-item');
    items.forEach(item => {
      const text = item.querySelector('.item-text').textContent.toLowerCase();
      item.style.display = text.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
    });
  }

  renderList() {
    const list = this.shadowRoot.querySelector('#recoList');
    const emptyState = this.shadowRoot.querySelector('#emptyState');
    const count = this.shadowRoot.querySelector('#count');
    
    list.innerHTML = '';
    count.textContent = `${this.recomendaciones.length} elementos`;

    if (this.recomendaciones.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    this.recomendaciones.forEach((rec, index) => {
      const li = document.createElement('li');
      li.className = 'list-item';
      
      li.innerHTML = `
        <div class="item-content">
          <div class="item-text">${rec.text}</div>
          <small class="item-date">${rec.createdAt}</small>
        </div>
        <div class="item-actions">
          <button class="btn-edit" data-index="${index}">Editar</button>
          <button class="btn-delete" data-index="${index}">Eliminar</button>
        </div>
      `;

      li.querySelector('.btn-edit').addEventListener('click', () => this.edit(index));
      li.querySelector('.btn-delete').addEventListener('click', () => this.remove(index));

      list.appendChild(li);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.5;
          color: #333;
        }

        .header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .count {
          font-size: 0.875rem;
          color: #666;
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .input:focus {
          outline: none;
          border-color: #007bff;
        }

        .btn-group {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn:hover {
          background: #f8f9fa;
        }

        .btn-primary {
          background: #007bff;
          border-color: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        #cancelBtn {
          display: none;
        }

        .search-section {
          margin-bottom: 1.5rem;
        }

        .list-section h3 {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        #recoList {
          list-style: none;
        }

        .list-item {
          background: #f0f9f0;
          border: 1px solid #d4edda;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          transition: all 0.2s ease;
        }

        .list-item:hover {
          background: #e8f5e8;
          border-color: #c3e6cb;
        }

        .list-item:last-child {
          margin-bottom: 0;
        }

        .item-content {
          flex: 1;
          margin-right: 1rem;
        }

        .item-text {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #2d5016;
          font-weight: 500;
          line-height: 1.4;
        }

        .item-date {
          font-size: 0.75rem;
          color: #5a7c65;
        }

        .item-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .btn-edit, .btn-delete {
          padding: 0.5rem 1rem;
          border: 1px solid rgba(45, 80, 22, 0.2);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.8);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
          color: #2d5016;
        }

        .btn-edit:hover {
          background: white;
          border-color: #28a745;
          color: #28a745;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .btn-delete:hover {
          background: white;
          border-color: #dc3545;
          color: #dc3545;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #666;
        }

        .empty-state h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #999;
        }

        .empty-state p {
          font-size: 0.875rem;
          color: #aaa;
        }

        @media (max-width: 640px) {
          .container {
            margin: 1rem;
            padding: 1rem;
          }

          .list-item {
            flex-direction: column;
            gap: 0.75rem;
            align-items: stretch;
          }

          .item-content {
            margin-right: 0;
          }

          .item-actions {
            justify-content: flex-end;
          }

          .btn-group {
            flex-direction: column;
          }
        }
      </style>

      <div class="container">
        <header class="header">
          <h2>Recomendaciones</h2>
          <div class="count" id="count">0 elementos</div>
        </header>

        <section class="form-section">
          <div class="form-group">
            <input 
              type="text" 
              id="recoInput" 
              class="input" 
              placeholder="Nueva recomendación..."
              maxlength="200"
            >
          </div>
          <div class="btn-group">
            <button id="addBtn" class="btn btn-primary">Agregar</button>
            <button id="cancelBtn" class="btn">Cancelar</button>
          </div>
        </section>

        <section class="search-section">
          <input 
            type="text" 
            id="searchInput" 
            class="input" 
            placeholder="Buscar..."
          >
        </section>

        <section class="list-section">
          <h3>Lista</h3>
          
          <div id="emptyState" class="empty-state" style="display: none;">
            <h3>No hay recomendaciones</h3>
            <p>Agrega una nueva recomendación para comenzar.</p>
          </div>
          
          <ul id="recoList"></ul>
        </section>
      </div>
    `;

    this.renderList();
  }
}

customElements.define('data-crud', DataCrud);