class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.API_KEY = 'c4b8733fbed1c527c110076e22b1a4ec';
    this.LAT = -0.2299;
    this.LON = -78.5249;
  }

  async connectedCallback() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.LAT}&lon=${this.LON}&appid=${this.API_KEY}&units=metric`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error de red o clave inválida");
      const data = await res.json();
      const recomendaciones = this.generarRecomendaciones(data);
      this.render(recomendaciones);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
  }

  generarRecomendaciones(data) {
    const recs = [];

    if (data.main.temp > 28) recs.push("Evita exponerte al sol directo. Usa bloqueador.");
    if (data.main.temp < 10) recs.push("Abrígate bien, hace mucho frío.");
    if (data.wind.speed > 5) recs.push("Evita zonas abiertas por fuertes vientos.");
    if (data.weather[0].main.includes("Rain")) recs.push("Lleva paraguas o impermeable.");

    if (recs.length === 0) recs.push("El clima es ideal. Disfruta tu día con precaución.");

    return recs;
  }

  render(recs) {
    this.shadowRoot.innerHTML = `
      <style>
        .recomendaciones {
          background: #f0fff4;
          padding: 1rem;
          border: 1px solid #c3e6cb;
          border-radius: 8px;
          font-family: sans-serif;
        }

        li {
          margin-bottom: 0.5rem;
        }
      </style>
      <div class="recomendaciones">
        <h3>Recomendaciones del clima</h3>
        <ul>
          ${recs.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}

customElements.define('user-recommendations', UserRecommendations);
