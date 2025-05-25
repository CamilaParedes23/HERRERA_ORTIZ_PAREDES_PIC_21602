class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.apiKey = "9c17a7b62fef43e69e214622252505";
    this.city = "Quito";
  }

  async connectedCallback() {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=yes`;

    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error("Error al cargar recomendaciones");
      const data = await res.json();
      const recomendaciones = this.generarRecomendaciones(data.current);
      this.render(recomendaciones);
    } catch (error) {
      this.shadowRoot.innerHTML = <p style="color:red;">${error.message}</p>;
    }
  }

  generarRecomendaciones(current) {
    const recs = [];
    if (current.temp_c > 28) recs.push("Evita el sol directo. Usa bloqueador.");
    if (current.temp_c < 10) recs.push("Hace frío. Abrígate bien.");
    if (current.wind_kph > 20) recs.push("Cuidado con los vientos fuertes.");
    if (current.condition.text.toLowerCase().includes("rain")) recs.push("Lleva paraguas.");

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
        <ul>${recs.map(r => <li>${r}</li>).join('')}</ul>
      </div>
    `;
  }
}

customElements.define('user-recommendations', UserRecommendations);