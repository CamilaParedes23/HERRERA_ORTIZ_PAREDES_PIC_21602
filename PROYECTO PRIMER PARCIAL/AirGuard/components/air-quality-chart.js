class AirQualityChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.apiKey = "9c17a7b62fef43e69e214622252505";
    this.city = "Quito";
  }

  async connectedCallback() {
    try {
      const data = await this.fetchWeatherData();
      this.render();
      this.drawChart(data);
    } catch (error) {
      this.showError(error.message);
    }
  }

  async fetchWeatherData() {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=yes&lang=es`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al cargar datos");
    const data = await res.json();

    return {
      temp: data.current.temp_c,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_kph / 3.6 // km/h a m/s
    };
  }

  render() {
    const style = `
      <style>
        .chart-container {
          max-width: 600px;
          margin: 2rem auto;
          background: #fff;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      </style>
    `;

    const container = document.createElement('div');
    container.className = 'chart-container';

    const canvas = document.createElement('canvas');
    canvas.id = 'weatherChart';

    container.appendChild(canvas);
    this.shadowRoot.innerHTML = style;
    this.shadowRoot.appendChild(container);
  }

  drawChart({ temp, humidity, wind_speed }) {
    const labels = ['Temperatura (°C)', 'Humedad (%)', 'Viento (m/s)'];
    const dataValues = [temp, humidity, wind_speed];
    const colors = ['#36A2EB', '#FF6384', '#FFCE56'];

    new Chart(this.shadowRoot.getElementById('weatherChart'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Condiciones actuales',
          data: dataValues,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: `Condiciones actuales - ${this.city}` }
        }
      }
    });
  }

  showError(message) {
    this.shadowRoot.innerHTML = `<p style="color:red;">Error al obtener datos del clima<br>${message}</p>`;
  }
}

customElements.define('air-quality-chart', AirQualityChart);
