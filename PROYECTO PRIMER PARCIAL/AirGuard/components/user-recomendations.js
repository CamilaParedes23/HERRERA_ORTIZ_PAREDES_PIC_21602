class UserRecommendations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.apiKey = "9c17a7b62fef43e69e214622252505";
    this.city = "Quito";
  }

  //Método se ejecuta automáticamente cuando el componente se inserta
  //en el documento
  async connectedCallback() {
    //Se construye la URL para consultar el clima actual con calidad del aire
    const URL = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=yes&lang=es`;
    console.log("🔗 URL solicitada:", URL);

    try {
      const res = await fetch(URL);
      console.log("📦 Respuesta cruda:", res);

      if (!res.ok) throw new Error("❌ Error al cargar recomendaciones");

      const data = await res.json();
      console.log("📄 Datos recibidos:", data);

      //Genera recomendaciones personalizadas en base a los datos del clima
      //actual y se renderiza en pantalla
      const recomendaciones = this.generarRecomendaciones(data.current);
      this.render(recomendaciones);
    } catch (error) {
      console.error("⚠️ Error capturado:", error);
      //Limpia el contenido del Shadow DOM 
      this.shadowRoot.innerHTML = '';
      const errorMsg = document.createElement('p');
      errorMsg.style.color = 'red';
      errorMsg.textContent = error.message;
      this.shadowRoot.appendChild(errorMsg);
    }
  }

  //Método para generar las recomendaciones
  generarRecomendaciones(current) {
    const recs = [];
    if (current.temp_c > 28) recs.push("Evita el sol directo. Usa bloqueador.");
    if (current.temp_c < 10) recs.push("Hace frío. Abrígate bien.");
    if (current.wind_kph > 20) recs.push("Cuidado con los vientos fuertes.");
    if (current.condition.text.toLowerCase().includes("lluvia")) recs.push("Lleva paraguas.");
    return recs.length ? recs : ["Clima ideal. Disfruta tu día con precaución."];
  }

  //se limpia el Shadow DOM antes de renderizar
  render(recs) {
    this.shadowRoot.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = `
      .recomendaciones {
        background: #f0fff4;
        padding: 1rem;
        border: 1px solid #c3e6cb;
        border-radius: 8px;
        font-family: sans-serif;
        max-width: 100%;
        box-sizing: border-box;
      }

      h3 {
        margin-top: 0;
        font-size: 1.2rem;
      }

      li {
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      @media (max-width: 600px) {
        .recomendaciones {
          padding: 0.75rem;
          font-size: 0.95rem;
        }
      }
    `;
    this.shadowRoot.appendChild(style);

    const container = document.createElement('div');
    container.className = 'recomendaciones';

    const title = document.createElement('h3');
    title.textContent = 'Recomendaciones del clima';
    container.appendChild(title);

    //Creación de lista con cada recomendación, generada previamente
    const list = document.createElement('ul');
    recs.forEach(rec => {
      const li = document.createElement('li');
      li.textContent = rec;
      list.appendChild(li);
    });

    container.appendChild(list);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define('user-recommendations', UserRecommendations);
