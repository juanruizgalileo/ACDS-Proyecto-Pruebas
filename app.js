const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

// endpoint de prueba para pruebas funcionales
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

module.exports = app;