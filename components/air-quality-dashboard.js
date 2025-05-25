class AirQualityDashboard extends HTMLElement {
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
      if (!res.ok) throw new Error("Error al obtener datos del clima");
      const data = await res.json();
      this.render(data);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }

  render(data) {
    const current = data.current;
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
        <h3>Condiciones actuales</h3>
        <div class="card">
          <p><strong>Temperatura:</strong> ${current.temp} °C</p>
          <p><strong>Humedad:</strong> ${current.humidity}%</p>
          <p><strong>Presión:</strong> ${current.pressure} hPa</p>
          <p><strong>Viento:</strong> ${current.wind_speed} m/s</p>
          <p><strong>Condición:</strong> ${current.weather[0].description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('air-quality-dashboard', AirQualityDashboard);
