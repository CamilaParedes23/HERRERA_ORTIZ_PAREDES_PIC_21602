// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(cors()); // Middleware para manejar CORS
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});