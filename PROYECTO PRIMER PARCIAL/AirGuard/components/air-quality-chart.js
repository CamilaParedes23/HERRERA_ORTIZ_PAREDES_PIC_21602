class AirQualityChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-0.2299&lon=-78.5249';

    try {
      const res = await fetch(URL, {
        headers: {
          'User-Agent': 'AirQualityChart/1.0 contacto@ejemplo.com'
        }
      });

      if (!res.ok) throw new Error("Error al cargar datos");

      const data = await res.json();
      const now = data.properties.timeseries[0].data.instant.details;

      this.render();
      this.loadChart({
        temp: now.air_temperature,
        humidity: now.relative_humidity,
        wind_speed: now.wind_speed
      });
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color:red;">Error al obtener datos del clima<br>${error.message}</p>`;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
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
      <div class="chart-container">
        <canvas id="weatherChart"></canvas>
      </div>
    `;
  }

  loadChart(current) {
    const ctx = this.shadowRoot.getElementById('weatherChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Temperatura (°C)', 'Humedad (%)', 'Viento (m/s)'],
        datasets: [{
          label: 'Condiciones actuales',
          data: [current.temp, current.humidity, current.wind_speed],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Condiciones actuales - Quito' }
        }
      }
    });
  }
}

customElements.define('air-quality-chart', AirQualityChart);
