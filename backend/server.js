const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Ruta mock de Comtrade
app.get('/mock-preview', (req, res) => {
  const filePath = path.join(__dirname, 'mock-comtrade.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Error leyendo mock data:', err);
      return res.status(500).json({ error: 'Error leyendo datos simulados' });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ NUEVA RUTA DE PRODUCTOS
app.get('/productos', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const productos = [
    { name: 'Limón', code: '080550' },
    { name: 'Mango', code: '080450' },
    { name: 'Piña', code: '080430' },
  ];

  const resultados = productos.filter((prod) =>
    prod.name.toLowerCase().includes(q)
  );

  res.json(resultados);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`);
});
