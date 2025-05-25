class AirQualityDashboard extends HTMLElement {
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
      const response = await fetch(url);
      if (!response.ok) throw new Error("No autorizado o error de red");
      const data = await response.json();
      this.render(data);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color:red;">Error al obtener datos del clima: ${error.message}</p>`;
    }
  }

  render(data) {
    const { name, main, weather, wind } = data;

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

        p {
          margin: 0.25rem 0;
        }
      </style>

      <div class="dashboard">
        <h3>Clima actual - ${name}</h3>
        <div class="card">
          <p><strong>Temperatura:</strong> ${main.temp} °C</p>
          <p><strong>Humedad:</strong> ${main.humidity}%</p>
          <p><strong>Presión:</strong> ${main.pressure} hPa</p>
          <p><strong>Viento:</strong> ${wind.speed} m/s</p>
          <p><strong>Condición:</strong> ${weather[0].description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('air-quality-dashboard', AirQualityDashboard);
