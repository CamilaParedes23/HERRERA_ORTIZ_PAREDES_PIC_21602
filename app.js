const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Importar authRoutes

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', authRoutes); // ✅ Usar authRoutes

module.exports = app;