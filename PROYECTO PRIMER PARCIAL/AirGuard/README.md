# 🌍 AirGuard - Plataforma Educativa sobre la Calidad del Aire

**AirGuard** es una aplicación web desarrollada con **Web Components** que permite consultar la calidad del aire en tiempo real, recibir recomendaciones basadas en las condiciones climáticas actuales y acceder a contenido educativo sobre la contaminación ambiental.

## 🚀 Características

- 📊 **Dashboard Interactivo**: Visualiza temperatura, humedad y velocidad del viento mediante gráficos dinámicos.
- 💡 **Recomendaciones Inteligentes**: Generadas automáticamente según el clima actual usando la API de WeatherAPI.
- 📚 **Sección Educativa**: Artículos informativos sobre el impacto de la contaminación del aire.
- ✍️ **CRUD de Recomendaciones**: Agrega, edita, busca o elimina sugerencias personalizadas.
- 📱 **Diseño Responsive**: Optimizado para dispositivos móviles y de escritorio.
- 🧩 **Componentes Modulares**: Cada sección está desarrollada como un Web Component reutilizable.

## 🧰 Tecnologías Usadas

- 🔧 **JavaScript ES6+**
- 🧱 **Web Components (Custom Elements + Shadow DOM)**
- 📦 **WeatherAPI** para datos del clima y calidad del aire
- 💾 **LocalStorage** para persistencia en el CRUD
- 📊 **Chart.js** para visualización gráfica

## 📁 Estructura del Proyecto

```plaintext
AirGuard/
├── index.html                     # Página principal
├── main.js                        # Script principal
└── components/                    # Componentes Web
    ├── air-quality-chart.js        # Gráfico del clima
    ├── air-quality-dashboard.js    # Panel con datos meteorológicos
    ├── data-crud.js                # CRUD de recomendaciones
    ├── education-section.js        # Artículos educativos
    ├── main-menu.js                # Menú principal (si se usa)
    ├── nav-sidebar.js              # Barra lateral navegable
    ├── nav-navigation.js           # Script utilitario de navegación
    └── user-recommendations.js     # Recomendaciones según el clima
```

## 🔑 API Usada

Se utiliza [WeatherAPI](https://www.weatherapi.com/) para obtener datos meteorológicos y de calidad del aire.  
**Ejemplo de endpoint:**

```text
https://api.weatherapi.com/v1/current.json?key=TU_API_KEY&q=Quito&aqi=yes&lang=es
```
