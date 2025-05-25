class DataCrud extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.recomendaciones = JSON.parse(localStorage.getItem('recomendaciones')) || [];
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    this.shadowRoot.querySelector('#addBtn').addEventListener('click', () => {
      const input = this.shadowRoot.querySelector('#recoInput');
      if (input.value) {
        this.recomendaciones.push(input.value);
        this.updateStorage();
        input.value = '';
        this.renderList();
      }
    });
  }

  updateStorage() {
    localStorage.setItem('recomendaciones', JSON.stringify(this.recomendaciones));
  }

  remove(index) {
    this.recomendaciones.splice(index, 1);
    this.updateStorage();
    this.renderList();
  }

  renderList() {
    const list = this.shadowRoot.querySelector('#recoList');
    list.innerHTML = this.recomendaciones.map((rec, i) => `
      <li>${rec} <button data-index="${i}">Eliminar</button></li>
    `).join('');

    list.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => this.remove(btn.dataset.index));
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .crud {
          background: #eaf6ff;
          padding: 1rem;
          border-radius: 8px;
          font-family: sans-serif;
        }

        input, button {
          padding: 0.5rem;
          margin: 0.5rem 0;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin-bottom: 0.5rem;
        }

        button {
          background: crimson;
          color: white;
          border: none;
          cursor: pointer;
        }

        button:hover {
          background: darkred;
        }
      </style>

      <div class="crud">
        <h3>Agregar Recomendación</h3>
        <input type="text" id="recoInput" placeholder="Ej. Usa mascarilla al salir" />
        <button id="addBtn">Agregar</button>
        <ul id="recoList"></ul>
      </div>
    `;

    this.renderList();
  }
}

customElements.define('data-crud', DataCrud);
