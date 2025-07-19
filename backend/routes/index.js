const express = require('express');
const router = express.Router();
const { obtenerDatosPreview } = require('../services/comtradePreview');

router.get('/preview-datos', async (req, res) => {
  try {
    const datos = await obtenerDatosPreview();
    res.json({ resultado: datos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos desde Comtrade Preview' });
  }
});

module.exports = router;
