class EducationSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.articles = [
      {
        title: '¿Qué es el PM2.5?',
        content: `Las partículas PM2.5 son diminutas, de menos de 2.5 micrones de diámetro, capaces de penetrar profundamente en los pulmones y llegar al torrente sanguíneo. 
        Estas partículas pueden causar enfermedades respiratorias y cardiovasculares. Es importante monitorear su concentración en el aire que respiramos.`,
        image: 'https://cdn-icons-png.flaticon.com/512/2883/2883890.png'
      },
      {
        title: 'Cómo protegerte de la contaminación',
        content: `Evita hacer ejercicio al aire libre en días de alta contaminación, usa mascarillas con filtro, mantén cerradas puertas y ventanas y utiliza purificadores de aire en casa. 
        Además, consulta regularmente las alertas de calidad del aire en tu zona para tomar precauciones adicionales.`,
        image: 'https://cdn-icons-png.flaticon.com/512/4385/4385537.png'
      },
      {
        title: 'Impacto del aire contaminado en niños',
        content: `Los niños son más vulnerables a los efectos del aire contaminado porque sus pulmones están en desarrollo y respiran más rápido que los adultos. 
        La exposición prolongada puede provocar asma, infecciones respiratorias y afectar el desarrollo pulmonar.`,
        image: 'https://cdn-icons-png.flaticon.com/512/2537/2537944.png'
      },
      {
        title: 'Efectos del ozono a nivel del suelo',
        content: `El ozono troposférico (a nivel del suelo) es un contaminante secundario que afecta la salud respiratoria, causando irritación en ojos, nariz y garganta, y puede agravar enfermedades pulmonares. 
        Es especialmente peligroso para personas con asma y adultos mayores.`,
        image: 'https://cdn-icons-png.flaticon.com/512/1779/1779994.png'
      },
      {
        title: 'Importancia de plantar árboles',
        content: `Los árboles ayudan a mejorar la calidad del aire al absorber dióxido de carbono y otros contaminantes, además de liberar oxígeno. 
        Promover la reforestación urbana puede contribuir significativamente a reducir la contaminación y mejorar la salud pública.`,
        image: 'https://cdn-icons-png.flaticon.com/512/4270/4270450.png'
      }
    ];
  }

  connectedCallback() {
    this.render();
  }

  toggleContent(e) {
    const btn = e.currentTarget;
    const content = btn.previousElementSibling;
    const expanded = content.classList.toggle('expanded');
    btn.textContent = expanded ? 'Leer menos ▲' : 'Leer más ▼';
  }

  render() {
    this.shadowRoot.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = `
      section {
        max-width: 900px;
        margin: 2rem auto;
        padding: 1rem;
        font-family: 'Segoe UI', sans-serif;
      }

      h3 {
        text-align: center;
        margin-bottom: 2rem;
        color: #2c3e50;
      }

      .card {
        background: #fff;
        margin-bottom: 1.5rem;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
      }

      .card img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        flex-shrink: 0;
      }

      .card-content {
        flex: 1;
        position: relative;
      }

      h4 {
        margin: 0;
        color: #2980b9;
        font-size: 1.2rem;
      }

      p {
        margin: 0.5rem 0 0;
        color: #444;
        max-height: 4.5rem;
        overflow: hidden;
        transition: max-height 0.4s ease;
        line-height: 1.5rem;
      }

      p.expanded {
        max-height: 100vh; /* suficiente para mostrar todo */
      }

      button.toggle-btn {
        margin-top: 0.5rem;
        background: none;
        border: none;
        color: #2980b9;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.9rem;
        padding: 0;
      }
      button.toggle-btn:hover {
        text-decoration: underline;
      }

      @media (max-width: 600px) {
        .card {
          flex-direction: column;
          text-align: center;
        }

        .card img {
          margin-bottom: 0.5rem;
        }
      }
    `;
    this.shadowRoot.appendChild(style);

    const section = document.createElement('section');
    const title = document.createElement('h3');
    title.textContent = 'Educación sobre la Contaminación del Aire';
    section.appendChild(title);

    this.articles.forEach(({ title, content, image }) => {
      const card = this.createElementWithClass('article', 'card');

      const img = document.createElement('img');
      img.src = image;
      img.alt = title;

      const contentDiv = this.createElementWithClass('div', 'card-content');

      const h4 = document.createElement('h4');
      h4.textContent = title;

      const p = document.createElement('p');
      p.textContent = content;

      const btn = document.createElement('button');
      btn.textContent = 'Leer más ▼';
      btn.className = 'toggle-btn';
      btn.addEventListener('click', e => this.toggleContent(e));

      contentDiv.appendChild(h4);
      contentDiv.appendChild(p);
      contentDiv.appendChild(btn);

      card.appendChild(img);
      card.appendChild(contentDiv);
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
