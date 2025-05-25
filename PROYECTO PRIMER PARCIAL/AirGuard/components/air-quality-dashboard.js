class AirQualityDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.apiKey = "9c17a7b62fef43e69e214622252505";
    this.city = "Quito";
  }

  async connectedCallback() {
    try {
      const data = await this.fetchWeatherData();
      this.renderDashboard(data);
    } catch (error) {
      this.showError(error.message);
    }
  }

  async fetchWeatherData() {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=yes&lang=es`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al obtener datos del clima");
    return res.json();
  }

  renderDashboard(data) {
    const { location, current } = data;

    this.shadowRoot.innerHTML = ''; // Limpiar todo

    const style = document.createElement('style');
    style.textContent = `
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
        margin: 0.5rem 0;
      }
    `;
    this.shadowRoot.appendChild(style);

    const dashboard = this.createElementWithClass('div', 'dashboard');
    const heading = document.createElement('h3');
    heading.textContent = `Condiciones actuales en ${location.name}, ${location.country}`;
    dashboard.appendChild(heading);

    const card = this.createElementWithClass('div', 'card');
    const dataItems = [
      ["Temperatura", `${current.temp_c} °C`],
      ["Humedad", `${current.humidity}%`],
      ["Presión", `${current.pressure_mb} hPa`],
      ["Viento", `${current.wind_kph} km/h`],
      ["Condición", current.condition.text],
      ["Calidad del aire (PM2.5)", current.air_quality.pm2_5.toFixed(2)]
    ];

    dataItems.forEach(([label, value]) => {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${label}:</strong> ${value}`;
      card.appendChild(p);
    });

    dashboard.appendChild(card);
    this.shadowRoot.appendChild(dashboard);
  }

  createElementWithClass(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
  }

  showError(message) {
    this.shadowRoot.innerHTML = '';
    const errorMsg = document.createElement('p');
    errorMsg.style.color = 'red';
    errorMsg.textContent = message;
    this.shadowRoot.appendChild(errorMsg);
  }
}

customElements.define('air-quality-dashboard', AirQualityDashboard);
