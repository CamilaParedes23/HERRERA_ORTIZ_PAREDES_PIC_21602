import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/initDb';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Importar rutas
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import orderDetailRoutes from './routes/orderDetailRoutes';

// Configurar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'E-commerce API is running!',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-details', orderDetailRoutes);

// Middleware de manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Inicializar base de datos
    await initializeDatabase();
    console.log('📊 Database connected and initialized');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`📍 API base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();
