class EducationSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.articles = [
      {
        title: '¿Qué es el PM2.5?',
        content: 'Las partículas PM2.5 son diminutas, de menos de 2.5 micrones de diámetro, que pueden penetrar profundamente en los pulmones y llegar al torrente sanguíneo, causando enfermedades respiratorias y cardiovasculares.'
      },
      {
        title: 'Cómo protegerte de la contaminación',
        content: 'Evita hacer ejercicio al aire libre en días de alta contaminación, usa mascarillas con filtro, mantén cerradas puertas y ventanas, y monitorea la calidad del aire en tu zona.'
      },
      {
        title: 'Impacto del aire contaminado en niños',
        content: 'Los niños son más vulnerables a los efectos del aire contaminado, ya que sus pulmones aún están en desarrollo y respiran más rápido que los adultos.'
      }
    ];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = ''; // Limpiar

    const style = document.createElement('style');
    style.textContent = `
      section {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
      }

      h3 {
        text-align: center;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      .card {
        background: #ffffff;
        margin-bottom: 1rem;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        transition: transform 0.2s ease;
      }

      .card:hover {
        transform: translateY(-3px);
      }

      h4 {
        margin-top: 0;
        color: #2980b9;
      }

      p {
        margin: 0.5rem 0 0;
      }
    `;
    this.shadowRoot.appendChild(style);

    const section = document.createElement('section');
    const title = document.createElement('h3');
    title.textContent = 'Educación sobre la Contaminación del Aire';
    section.appendChild(title);

    this.articles.forEach(({ title, content }) => {
      const card = this.createElementWithClass('article', 'card');

      const h4 = document.createElement('h4');
      h4.textContent = title;

      const p = document.createElement('p');
      p.textContent = content;

      card.appendChild(h4);
      card.appendChild(p);
      section.appendChild(card);
    });

    this.shadowRoot.appendChild(section);
  }

  createElementWithClass(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
  }
}

customElements.define('education-section', EducationSection);
