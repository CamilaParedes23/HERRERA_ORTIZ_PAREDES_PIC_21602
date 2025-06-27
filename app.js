const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const autorRoutes = require('./routes/AutorRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api', autorRoutes); //localhost:3000/api/autores
module.exports = app;