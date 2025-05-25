class AirQualityDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback = async () => {
    const API_KEY = 'd31acd05af6a234c1b1ed81ff75d644e';
    const LAT = -0.2299;
    const LON = -78.5249;
    const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;

    try {
      const data = await this.fetchData(URL);
      this.renderDashboard(data.current);
    } catch (error) {
      this.showError(error.message);
    }
  };

  fetchData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener datos del clima");
    return res.json();
  };

  showError = (message) => {
    this.shadowRoot.innerHTML = `<p style="color:red;">${message}</p>`;
  };

  renderDashboard = (current) => {
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
          ${this.renderInfo(current)}
        </div>
      </div>
    `;
  };

  renderInfo = (data) => `
    <p><strong>Temperatura:</strong> ${data.temp} °C</p>
    <p><strong>Humedad:</strong> ${data.humidity}%</p>
    <p><strong>Presión:</strong> ${data.pressure} hPa</p>
    <p><strong>Viento:</strong> ${data.wind_speed} m/s</p>
    <p><strong>Condición:</strong> ${data.weather[0].description}</p>
  `;
}

customElements.define('air-quality-dashboard', AirQualityDashboard);
