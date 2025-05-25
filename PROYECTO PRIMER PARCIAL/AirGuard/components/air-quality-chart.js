class AirQualityChart extends HTMLElement {
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
      if (!res.ok) throw new Error("Error al cargar datos");
      const data = await res.json();
      this.render();
      this.loadChart(data.current);
    } catch (error) {
      this.shadowRoot.innerHTML = `<p style="color:red;">${error.message}</p>`;
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
        labels: ['Temperatura', 'Humedad', 'Viento'],
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
