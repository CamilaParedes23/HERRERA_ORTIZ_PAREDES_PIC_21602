class AirQualityChart extends HTMLElement {
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
      if (!res.ok) throw new Error("Error al cargar datos");
      const data = await res.json();

      this.render();
      this.loadChart({
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_kph / 3.6  // convertir km/h a m/s
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
