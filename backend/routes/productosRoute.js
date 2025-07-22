const express = require('express');
const router = express.Router();

router.get('/productos', (req, res) => {
  const query = req.query.q || '';
  const productos = [
    { name: 'Limón', code: '080550' },
    { name: 'Mango', code: '080450' },
    { name: 'Aguacate', code: '080440' },
    { name: 'Piña', code: '080430' },
    { name: 'Banano', code: '080390' }
  ];
  const filtrados = productos.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filtrados);
});

module.exports = router;
