class AirQualityDashboard extends HTMLElement {
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
      if (!res.ok) throw new Error("Error al obtener datos del clima");
      const data = await res.json();
      this.render(data);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }

  render(data) {
    const current = data.current;
    const location = data.location;

    this.shadowRoot.innerHTML = `
      <style>
        .dashboard {
          background: #eef6ff;
          padding: 1rem;
          border-radius: 10px;
          font-family: sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .card {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        h3 {
          margin: 0;
          color: #004085;
        }
      </style>

      <div class="dashboard">
        <h3>Condiciones actuales en ${location.name}, ${location.country}</h3>
        <div class="card">
          <p><strong>Temperatura:</strong> ${current.temp_c} °C</p>
          <p><strong>Humedad:</strong> ${current.humidity}%</p>
          <p><strong>Presión:</strong> ${current.pressure_mb} hPa</p>
          <p><strong>Viento:</strong> ${current.wind_kph} km/h</p>
          <p><strong>Condición:</strong> ${current.condition.text}</p>
          <p><strong>Calidad del aire (PM2.5):</strong> ${current.air_quality.pm2_5.toFixed(2)}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('air-quality-dashboard', AirQualityDashboard);
