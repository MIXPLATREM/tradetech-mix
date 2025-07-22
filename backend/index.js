const express = require('express');
const cors = require('cors');

const productosRoute = require('./routes/productosRoute');
const previewRoute = require('./routes/index'); // Este es tu router de /preview-datos

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/', productosRoute);
app.use('/', previewRoute);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
