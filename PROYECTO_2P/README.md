# E-Commerce System - Proyecto Segundo Parcial

## 📋 Descripción del Proyecto

Sistema de E-commerce completo desarrollado como proyecto integrador del segundo parcial, implementando una aplicación web dinámica con las mejores prácticas de desarrollo web moderno.

## 👥 Integrantes del Equipo

- **Anahy Herrera** - aeherrera16@espe.edu.ec
- **Bryan Ortiz** - baortiz7@espe.edu.ec  
- **Camila Paredes** - csparedes2@espe.edu.ec

**Carrera:** Tecnologías de la Información  
**Institución:** Universidad de las Fuerzas Armadas "ESPE"

## 🚀 Características Principales

### 🛍️ Gestión de Productos
- Crear, editar y eliminar productos
- Control de stock en tiempo real
- Validación de datos automática
- Búsqueda y filtros avanzados

### 📋 Gestión de Órdenes
- Crear órdenes para clientes
- Visualizar historial de órdenes
- Calcular totales automáticamente
- Editar información de órdenes

### 📊 Detalles de Órdenes
- Asociar productos a órdenes
- Especificar cantidades (precios automáticos)
- Ver desglose completo
- Actualización automática de stock

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **React Router** - Navegación entre páginas
- **CSS3 Modern** - Estilos modernos con gradientes y animaciones
- **Fetch API** - Comunicación con el backend

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **TypeScript** - Tipado estático
- **REST API** - Arquitectura de servicios web
- **CORS** - Intercambio de recursos entre orígenes

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **SQL Avanzado** - Consultas complejas
- **Triggers** - Automatización de procesos
- **Relaciones** - Integridad referencial

## 📁 Estructura del Proyecto

```
ecommerce-project/
├── backend/                 # Servidor Node.js + Express
│   ├── src/
│   │   ├── config/         # Configuración de BD
│   │   ├── controllers/    # Controladores HTTP
│   │   ├── interfaces/     # Types de TypeScript
│   │   ├── middleware/     # Middlewares
│   │   ├── models/         # Modelos de BD
│   │   ├── routes/         # Rutas de la API
│   │   ├── services/       # Lógica de negocio
│   │   └── index.ts        # Punto de entrada
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── products/   # Componentes de productos
│   │   │   ├── orders/     # Componentes de órdenes
│   │   │   └── Navigation.tsx
│   │   ├── interfaces/     # Interfaces TypeScript
│   │   ├── pages/          # Páginas principales
│   │   ├── services/       # Servicios para API
│   │   ├── utils/          # Utilidades
│   │   └── App.tsx
│   ├── package.json
│   └── public/
│
└── .github/
    └── copilot-instructions.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- PostgreSQL (v13 o superior)
- npm o yarn

### 1. Configuración de la Base de Datos

```sql
-- Crear la base de datos
CREATE DATABASE ecommerce_db;

-- Configurar usuario (opcional)
CREATE USER postgres WITH PASSWORD '123';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO postgres;
```

### 2. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env con tus credenciales de PostgreSQL

# Compilar TypeScript
npm run build

# Iniciar el servidor en modo desarrollo
npm run dev
```

### 3. Configuración del Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
npm start
```

## 🌐 URLs del Proyecto

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## 📡 Endpoints de la API

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Órdenes
- `GET /api/orders` - Obtener todas las órdenes
- `GET /api/orders/:id` - Obtener orden por ID
- `POST /api/orders` - Crear nueva orden
- `PUT /api/orders/:id` - Actualizar orden
- `DELETE /api/orders/:id` - Eliminar orden

### Detalles de Órdenes
- `GET /api/order-details` - Obtener todos los detalles
- `GET /api/order-details/:id` - Obtener detalle por ID
- `POST /api/order-details` - Crear nuevo detalle
- `PUT /api/order-details/:id` - Actualizar detalle
- `DELETE /api/order-details/:id` - Eliminar detalle

## 🗃️ Modelo de Base de Datos

### Tabla: productos
```sql
CREATE TABLE productos (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
  stock INTEGER NOT NULL CHECK (stock >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: ordenes
```sql
CREATE TABLE ordenes (
  id_orden SERIAL PRIMARY KEY,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  cliente VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: detalles_orden
```sql
CREATE TABLE detalles_orden (
  id_detalle SERIAL PRIMARY KEY,
  id_orden INTEGER REFERENCES ordenes(id_orden) ON DELETE CASCADE,
  id_producto INTEGER REFERENCES productos(id_producto) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(id_orden, id_producto)
);
```

## 🔧 Comandos Útiles

### Backend
```bash
npm run dev          # Modo desarrollo con nodemon
npm run build        # Compilar TypeScript
npm start           # Ejecutar versión compilada
```

### Frontend
```bash
npm start           # Iniciar desarrollo
npm run build       # Construir para producción
npm test           # Ejecutar tests
```

## 👩‍💻 Desarrollador

**Camila Paredes**
- Email: camila.paredes@estudiante.edu.co
- Carrera: Ingeniería en Sistemas
- Institución: Universidad Tecnológica

## 📝 Notas de Desarrollo

### Arquitectura Implementada

- **Backend**: Patrón de capas con separación clara de responsabilidades
- **Frontend**: Componentes React funcionales con hooks
- **Base de Datos**: Modelo relacional normalizado
- **API**: RESTful siguiendo convenciones HTTP

### Características Técnicas

- **TypeScript Strict Mode**: Habilitado en ambos proyectos
- **Control de Stock**: Automático al crear/editar detalles de orden
- **Validaciones**: En frontend y backend
- **Manejo de Errores**: Centralizado y descriptivo
- **Responsive Design**: Adaptable a dispositivos móviles

## 🔐 Configuración de Seguridad

- Variables de entorno para configuración sensible
- Validación de datos en todas las capas
- Manejo seguro de errores sin exposición de información interna

## 📜 Licencia

Este proyecto es parte de un trabajo académico desarrollado para fines educativos.

---

*Proyecto desarrollado con ❤️ usando tecnologías modernas de desarrollo web*
