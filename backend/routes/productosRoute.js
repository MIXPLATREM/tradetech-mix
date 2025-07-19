const express = require('express');
const router = express.Router();
const { buscarProductosITC } = require('../services/itcProducts');

router.get('/productos', async (req, res) => {
  const query = req.query.q || '';
  const data = await buscarProductosITC(query);
  res.json(data);
});

module.exports = router;
