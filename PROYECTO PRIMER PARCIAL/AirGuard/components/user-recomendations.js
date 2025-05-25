class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const API_KEY = 'd31acd05af6a234c1b1ed81ff75d644e';
    const LAT = -0.2299;
    const LON = -78.5249;
    const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error("Error al cargar recomendaciones");
      const data = await res.json();
      const recomendaciones = this.generarRecomendaciones(data.current);
      this.render(recomendaciones);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }

  generarRecomendaciones(current) {
    const recs = [];
    if (current.temp > 28) recs.push("Evita el sol directo. Usa bloqueador.");
    if (current.temp < 10) recs.push("Hace frío. Abrígate bien.");
    if (current.wind_speed > 5) recs.push("Cuidado con los vientos fuertes.");
    if (current.weather[0].main.includes("Rain")) recs.push("Lleva paraguas.");

    return recs.length ? recs : ["Clima ideal. Disfruta tu día con precaución."];
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
        <ul>${recs.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
    `;
  }
}

customElements.define('user-recommendations', UserRecommendations);
