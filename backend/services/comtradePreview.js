const axios = require('axios');

async function obtenerDatosPreview() {
  try {
    const params = {
      max: 500,
      type: 'C',
      freq: 'A',
      px: 'HS',       // Harmonized System
      ps: '2021',     // Año 2021
      r: '842',       // USA
      p: '156',       // China
      rg: '1',        // Importaciones
      cc: '01',       // Producto: Animales vivos (ejemplo simple)
      fmt: 'json'
    };

    const { data } = await axios.get(
      'https://comtradeapi.un.org/public/preview',
      { params }
    );

    const count = Array.isArray(data.dataset) ? data.dataset.length : 0;
    console.log('📦 Registros preview recibidos:', count);
    return data.dataset || [];
  } catch (err) {
    console.error('❌ Error preview:', err.response?.data || err.message);
    return [];
  }
}

module.exports = { obtenerDatosPreview };
