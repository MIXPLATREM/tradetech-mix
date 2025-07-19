const axios = require('axios');

// 🔑 Token correcto
const COMTRADE_TOKEN = 'e88dfa487518477cb8b047f7af06a6cf';

async function buscarProductosComtrade() {
  try {
    const params = {
      max: 10,
      type: 'C',
      freq: 'A',
      px: 'HS',
      ps: '2022',
      r: 'all',
      p: '0',
      rg: 'all',
      cc: 'TOTAL',
      fmt: 'json',
    };

    const { data } = await axios.get(
      'https://comtradeapi.un.org/api/get',
      {
        params,
        headers: {
          'Ocp-Apim-Subscription-Key': COMTRADE_TOKEN
        }
      }
    );

    const count = Array.isArray(data.dataset) ? data.dataset.length : 0;
    console.log('📦 Registros recibidos:', count);
    return data.dataset || [];
  } catch (err) {
    console.error('❌ Error Comtrade:', err.response?.data || err.message);
    return [];
  }
}

module.exports = { buscarProductosComtrade };
