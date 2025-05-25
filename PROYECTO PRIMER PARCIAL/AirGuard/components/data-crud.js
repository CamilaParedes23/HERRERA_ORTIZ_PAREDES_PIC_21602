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
    const addBtn = this.shadowRoot.querySelector('#addBtn');
    const input = this.shadowRoot.querySelector('#recoInput');

    addBtn.addEventListener('click', () => {
      if (input.value.trim()) {
        this.recomendaciones.push(input.value.trim());
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
    list.innerHTML = '';

    this.recomendaciones.forEach((rec, index) => {
      const li = document.createElement('li');
      li.textContent = rec;

      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.dataset.index = index;
      btn.addEventListener('click', () => this.remove(index));

      li.appendChild(document.createTextNode(' ')); // espacio entre texto y botón
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  render() {
    this.shadowRoot.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = `
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
    `;
    this.shadowRoot.appendChild(style);

    const container = this.createElementWithClass('div', 'crud');
    const heading = document.createElement('h3');
    heading.textContent = 'Agregar Recomendación';

    const input = document.createElement('input');
    input.id = 'recoInput';
    input.placeholder = 'Ej. Usa mascarilla al salir';

    const addBtn = document.createElement('button');
    addBtn.id = 'addBtn';
    addBtn.textContent = 'Agregar';

    const list = document.createElement('ul');
    list.id = 'recoList';

    [heading, input, addBtn, list].forEach(el => container.appendChild(el));
    this.shadowRoot.appendChild(container);

    this.renderList();
  }

  createElementWithClass(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
  }
}

customElements.define('data-crud', DataCrud);
