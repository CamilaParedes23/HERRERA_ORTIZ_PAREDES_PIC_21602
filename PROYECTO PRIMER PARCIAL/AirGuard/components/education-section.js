class EducationSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.articles = [
      {
        title: '¿Qué es el PM2.5?',
        content: `Las partículas PM2.5 son diminutas, de menos de 2.5 micrones de diámetro, capaces de penetrar profundamente en los pulmones y llegar al torrente sanguíneo. 
        Estas partículas pueden causar enfermedades respiratorias y cardiovasculares. Es importante monitorear su concentración en el aire que respiramos.`,
        image: 'https://img.freepik.com/vector-premium/icono-flujo-aire-que-muestra-particulas-aire-moviendose-flechas_98396-156442.jpg'
      },
      {
        title: 'Cómo protegerte de la contaminación',
        content: `Evita hacer ejercicio al aire libre en días de alta contaminación, usa mascarillas con filtro, mantén cerradas puertas y ventanas y utiliza purificadores de aire en casa. 
        Además, consulta regularmente las alertas de calidad del aire en tu zona para tomar precauciones adicionales.`,
        image: 'https://static.vecteezy.com/system/resources/previews/015/599/381/non_2x/ground-pollution-icon-outline-style-vector.jpg'
      },
      {
        title: 'Impacto del aire contaminado en niños',
        content: `Los niños son más vulnerables a los efectos del aire contaminado porque sus pulmones están en desarrollo y respiran más rápido que los adultos. 
        La exposición prolongada puede provocar asma, infecciones respiratorias y afectar el desarrollo pulmonar.`,
        image: 'data:image/png;base64,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'
      },
      {
        title: 'Efectos del ozono a nivel del suelo',
        content: `El ozono troposférico (a nivel del suelo) es un contaminante secundario que afecta la salud respiratoria, causando irritación en ojos, nariz y garganta, y puede agravar enfermedades pulmonares. 
        Es especialmente peligroso para personas con asma y adultos mayores.`,
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///8AAAD4+Pjy8vJ6enqxsbH8/PwvLy/t7e2srKzn5+fKysr19fXi4uLr6+vw8PBKSkqMjIzX19eZmZknJyempqZsbGw7OztfX1/BwcFaWlohISHc3NwTExM2NjYZGRlSUlJpaWmEhIRzc3NCQkK7u7vFxcWCgoLPz89NTU2enp4MDAx4eHgkJCSNFYirAAAQPElEQVR4nN1d2WLqOAy9bGFfU/YCSQsUSvv/vzctEEl2bEdx7EDnvMzcksWKF0lHsvzvn0dUu2Hc3FUuu/nXdBL4fNNjsIwrAj5Oj26RWzTmlRTO/yMZ+/u0fL+Y9R7dMkdoq+X7xf+jGz/0AlYqjUe3zgFmJgErlemj21cYdbOAf78XP0VxNvPovJVEnDy6jYUwEcQbT1o/mj4YHL/on1+qj25lETTpjCN2TI0O3rfHta8wpijGqCb+dNrhb6+PaZ0DBGsQIk79OMD+nT2gbW7QABkihaXdwk7slN82N4hAhKHq5y78HJbdMkfogAQanfcOq2y5DXOGRpYA/b8+TOuZgxCG8aHMdrnDKLOHoJfHZbbLGYKk+Wut0QImz6rMhjkDSBhpL+mBPVBaq1yiylDoySXz8prlEP9/CRmjtPa3R2lwuTd/939daf6dk/b3dVcAR/U3tQVSUFqND9/gj2r8Axhlmgte4YI/arWh5a0h1OLk9125DXOHlbmPlvDzZ9ktcwUcpiPFcoqeRWVQftsc4RtkWKWc/A5SHO+PaJsbII1RaUr9dMSf9NrkD4AGnULCtnUo12+jDKu1YesXw5o/trUz+UE/4/mvRJDKpd7t/AzWXv8Q0z8388WDq6/L8SwCou7SjGbj46vzmPJydn/Fd9RumS6UI2vN+fZb+lOeMfo6Xcm33/CymjpkXXuh+PTY1MaxskEES/Z7J+OL8UmbsSMhG+lnjw2DNSP4xA09DadyREeFbbuW/agMBO/KJxu60diLTIO0nxmkS7B5K6hcqyPNkw0D5KC55ac5vMhaKyPKKuGjUD/qh4pBxNZKfUudtQJW33LJ94vQfmld6J+6VjL3dyzP6RsWvHXhsMkt4M/SerQUcGp66sJ460mcv9x1b6j7pvPVe/2t/r7SDaqZVTe2hGfE4efXC/1D1rp/+oybPx2ym9fZuutYSWNdbwtJY8GpXV+nL9vYZLKQvJH9XZzXGP/m3stLL8OrhtpZ7jTScz2/T1bDm0lgmqhHvvJmoSo3ej81aYLBVE69yh15RQtMiLyjI+uWMas1xfZG3cxbTpF4i8otNQE+0Vn8OxpxLj3ZvtRYnuqciIv2t9FoTgHuk18G5mL2V2ajL9igL3wybimY5rs8Hx3o2xRBDQuCu2h1hzaz8pFntIkWglFNSwDjK+WxQkD+K0dDjBgKaj7v0OjSm5v8rwMSpkYMLLKu0kaqVI9H+bNQq3TFGbF1P6iFlEUUuJaQGjIfVk+gKZ9sogv6sC3/0nEsIfWwbalUmjLIzfA8auUA2e2+tww6jexzM6kNzUx/HCTXr+WJAYMq1bs2qF1cCCiIyF1tdL2OutkJT0KckGJsPxnszPRHfLWoRsGMeHHB6RF3ouigJ9+KN05xfuwoT4DPcZIoiq2KCj8LTfFv3g1oCq9BCXeI6nHBzuPQ2hTfjdHCKc1bTymPuFr+OGq1E9U76RxSgv7pENbjVfSD1eJ93D5OlAIM8XEujFwkwXa87yU6YBuJQdEZudXleKQiW77jdmppwi/mJjcapxDPZu4r2glQqorgNVRseSKYNeicBo1U+XYTiajim3gco4LvTqCyjfohh6heHGAEIW3hii/AFjNVT6hq4i+i9LWHSHexjF39tkjhF987EpAwvBfmDRpCMUUlBm1zGEXG6ldj4Qd3t80E9St3WNBtBAB5BARt1VVmLCb/YMq6ZHwgDhFx7+ilWPaVrAiXnOmXRgz/55AOIRqDz2gMBB4zlkdUy8D98+A0VRF3feRyDE7TeL9tzlfjdIBAvaFyG38euv3rit1rTZaN8flFed0VbrfsQX9ETh6nijONxifVAOkf3jWj2W1+DWrxfNyiGt2U8TKaGpLWgslYEXJwnW0K/KIDJfspN/Yt2xo/pnrdiSNNAEq8sCUoR8DXnzzTqyPFsF1nKuqZ3ryQOiPkM5VinL5oO2QAF1gpll4UiCH+er5o+gQNdPdpbqC+CnmwPWFd3OY3u6Ab3edigr4okoss9qBNqho0w6VBcwOYNUUULZ2DF6s8ARhKLrSWCEivK8Bt0VV0btdEmIjF05pkAClvb9FTQ9X2KYm3lSNYxEUtMSusDd4lEbBu+5DkAR72zwTJKri2fADNQrEe6aC0zHk5dkiWQdvtuHsHAqKERlLSEgktz2UyJBDupkB4zXkQkgIYI6u7SaZzIfIh8Up87IEq1oeoCXeF1vlkKPjI3E/mkdU8JNmjBYNr8fUhPurVVJOIy4vFzWi3F+ceDvGq7qUKSCuZATY0LOr6J94lCTaNhSYisaIn3rwELrDFKoZd+Mwlrab2jcSsgq2HhjkDxOzyU1EYxbBNrC4F4LvyZ1Lwg9//AqvrLlbkAVC64cJixvrTr5v+3K3GSB6698sdAlwfxlLa+1QXeXzqLkQGKHsp1W6teu7CedDMrPT9pUY8RR7YU+HIbaZhc85zlyOLk2aaPc+qMSj/zKMU8zuMbGmQEdV9YhHRQTdSXJo6uQhGwnjvFL7vf6z8y3YxPuRIMC+GHmQUGKMFUlDpZRUvJJkzI2KTL3EhXjjeYaMD6mxToEFIFJq3B7/dHfS6NGCUoWpqcbrb92VULgV7xsiVkg1PlSY1QEmRTnMfqvagVUqpJogtNK0zpK/kbZ/dhE02qhrtPllr+pgLLBFr2vZPvNz0WOzFmR9IrERbbi/iamFa7dHLVX7y7uKyMs+opkq2O/xWZ8WmN02XQXqFpX0tpsJtxHwwr+wOmf4m5+cEV9lVUKfGwqzbH9Y6Exqq8tiJJJ5i/JBFU4rILIQPOUCp/c1E+mmNzj0YpJYqGq0momiQ4DFOkEIglrSRgeoBU2H5IoheCyMFs98sH5uJmDvZgU21ZdMgrUvQKDhHPFk2RMCLOewOeW+2aS7wIvE9sNPGi30a0MyJDBIJJLSNesGXFCNT8I191NsbUBWclZ9TVEIwfaX6+eCueHAtBTM40zIECS2jz2C2SzkWdX8SCinM2QwiWKWWUf7SJZwIdESUef0SM+rsIrwlSzgUD32Jsq5/pfyTXXSpVAlrcpGurBvE2iJ2CrFECVtjKQc7a5EZyHuyrNpSmoTL1CaIrEHXlW+obGxS8sqQMBg00iXI1lmukGrbRGTxdq8SBr3+pBvOVBsAF1l8pXoHlwV9703Cxqj5stZur8pkN3U1r/KHen1JaNx6FGdqNpEcC4tkmXuS0HCYW2WfHa8VdsMuBoTIyE+reJJQH0dpMkz5gKqV64AGRZrf/PYkoU6+EcsZo2UK70RRshjn385SZh+uP5h1/PCWb5DoJqKFL1faPHypd5kZ4lXcTbYhFFV3/BXabEjytZbKW5CyCv4SEGPURaqnN33Ynu/WLxuLppJAk5M8J79WG/hKOdhqTEhwU7fBr4RhfgkxopizCnXmAyUJvzQSdvqDHC8G24uflOU8Fw+SiKVqLLFCwkF4p59n3C5p55cQAm4R+5YMwCcTjX1YC1EDUWOYWWEVovTsUYpbC5wd1auuqghbkfBF4iZiHrU3zt1cmLnuAiZA9QicAlKayfQUKtRzZwmsV+zYADTH3X5q1K/UYAB3BTZ53GzFRePYuBH+LF8U2svVh1g+xd0mQOytJs5EJB1gp9T1X5/4K2ufWcLeX7jtBTcpYguQiR56KrvpbUgeSbpRMjtva+6NCbrFuzjPTiY5s5aXpwOYBE5yNzoLiQuQx3OV8J4fWdsxJYT48jn7WqkxLrOahxUDUFeE2+/5/V/X8qWcUZr/AEUgP5yWNTBUl6I6IYC51JF/0iFOf6gMJH7lzm3qoPYA+a1ar1+vZ9irsGOL71ok5Nzc8akmmhMgVMcED5ftqwrgHNeN/BG7JcnS5Hy38VGVF6UMziYrL8dIgbHBpwDh47Lv4CJoy4Vo3pQxgsQV4Uws3BnIZ1eSPmQvvnkwCffJ87dvWkosaTRjzzSuYHwGo8hORBaGr5PJqzFBqR2NuCMPMn1yBBtgN+lDN1C03lgzETnBHNobklwefCDhgtOJQJnmYSNgcSojBduA6/acDKMG3ck8BW3Ay37Aee6DPlKeN0VnvhxX5TylQsDT8VGcwozfWQUH7F0lNJcHQEY4V2/UrL6LE0RUr2WPUkJ55LO/wPXO1KG96Th0md977ZPERbi6wKZIHtpreflW4IOjjAtPF9oiB7gxRDdy5qYHDKkUJMCZ18DEb2O21od368QdnXPPYz2Pp+O7ytdnfgxJVcm8qz76I2Y7IeHkbApNaCD7H/rxUSP5CfkXfXyP8eMAk+RwRYoFAfVfuE9OkrFwgnCER6bLQEKX5h3tRf0kJItM5WLjqWMWh2mOQVzFaXG1Tngj4RZt/YcTcvOsiHmyTBmUQZ1xjSWM6m0gbNa1TKDGPAWDhwEDqtRqEYGYyGRbbIQctaQ/Zgde5bqaqgkHMQHDvoIkMYhUVNEVkLjoo26VGg2J6ilSLoaUsdxqBirMVg8V8pRIbdIstImBHgn2rV6uhqB0i7yID7mew6VgeFP4YGqrAWIrfrdIJpCKf58LKylB6exU3wvURSnVk8TzQZ345yIPfz6mVhwYNqVMROEovbObYSPlTc9lXxBtpzJIK3LUyMZZbn/qnOjdrH38ZVKqne7hg2gm94WN00BDq8Bhximk6qtr4CizyAhgt93kaSU4Mk8ZKaHABazcjte1Fu+gGP9FonyczpJ69CM7EdW9k5PdRLAONndIZShAzxXwYgUPNPFbCn8MeW0s1MHxVH2y2sisMOSjbuwvauKeGLcrqYBhYyGFcDf7zz7adk6PviEQk7k9zEIB/e70Y7ZYrRZx/XM5uXJs+HI3J5CmXil+1XKMfAHEB/Hi64uFbR5Sm5GMIh+EjdCHjwlpdjx/YlzisnejeQI1CTz0ItjG5cczAXSPlPvaAe5O+SkAukPVvcmRPPn7UYP0By2qlPeu3WH4fo9MDhEz0B27N0A1+LKaWBC11tzpmgpG8QO0PYG0j2Bk5DJb01mdz+aGzyHhv1dp0/i8rXECgtNt2OkDIhLenkTCf4OU97FKn2bc6yKBxS12A8roofPwilgW8cf9iMJGtz8M/lVbk2W7LgaOmGtjM+f1PsEjPABM5iO5/LHJknd0ch2wynO38u+n8Is83cjLlYel1HuhUyYC7aHWabCcIZiGJRUdZmCoOjlVCU56PW4Kc3+enj162bzVDYzVERjpZzuZoB/qT+VeQaggWyUiE1xmPgQTg8ZsK4c91qNxl+QaZXrMAT6ghOCPDVqT4+fH+yz+wde4fXq9pcChnZ5VdiqGK8tL+HACVJtm65Ssy0980JIKxBOJDJeR9Kc/1oVCjsBem1tIoiWcXWzPhYCstDu1v9zKUWD1GUEzRCtfCpt6SpdhPwEDzxBTDN9E3d9rCGomekgLC0OKu57Dye1EiVa/PRN/2v+5SXjHV0VGcxSN5hv5ry/PZJDmg3bzswBdauSfACddZ/Gk1hoTp9SQlPGADXRu0UtPRmGEPngPpBNMRlr5Nk/oMFmhq6av5tO/PQMFdMKzJN7Lh7MKTs+C3vHzfbTeVC677SJsdHx2339GIMbppwui+AAAAABJRU5ErkJggg=='
      },
      {
        title: 'Importancia de plantar árboles',
        content: `Los árboles ayudan a mejorar la calidad del aire al absorber dióxido de carbono y otros contaminantes, además de liberar oxígeno. 
        Promover la reforestación urbana puede contribuir significativamente a reducir la contaminación y mejorar la salud pública.`,
        image: 'data:image/png;base64,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'
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
