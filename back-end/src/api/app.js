const express = require('express');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const productsRouter = require('./routes/productsRouter');
const registerRoute = require('./routes/registerRoute');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/products', productsRouter);
app.use('/register', registerRoute);

app.use((err, _req, res, _next) =>
  res.status(err.code || 500).json({ message: `${err.message}` }));

module.exports = app;
