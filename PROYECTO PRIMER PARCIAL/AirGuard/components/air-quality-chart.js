class AirQualityChart extends HTMLElement {
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
      this.render();
      this.loadChart(data);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color:red;">Error al cargar gráfico: ${error.message}</p>`;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .chart-container {
          width: 100%;
          max-width: 600px;
          margin: auto;
          background: #fff;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        canvas {
          width: 100%;
          height: 300px;
        }
      </style>
      <div class="chart-container">
        <canvas id="weatherChart"></canvas>
      </div>
    `;
  }

  loadChart(data) {
    const ctx = this.shadowRoot.getElementById('weatherChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Temperatura', 'Humedad', 'Viento'],
        datasets: [{
          label: 'Mediciones actuales',
          data: [data.main.temp, data.main.humidity, data.wind.speed],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Clima actual - Quito'
          }
        }
      }
    });
  }
}

customElements.define('air-quality-chart', AirQualityChart);
