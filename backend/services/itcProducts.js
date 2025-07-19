const axios = require('axios');

const API_KEY_ITC = 'd4aead4594ac4783b9f487d6c1045a9b';

async function buscarProductosITC(query) {
  try {
    const response = await axios.get('https://api.intracen.org/api/v1/products/search', {
      headers: {
        Authorization: `Bearer ${API_KEY_ITC}`,
        Accept: 'application/json',
      },
      params: {
        query,
        limit: 20,
      },
    });

    console.log('📦 Resultado crudo desde ITC:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error en llamada a ITC:', error.message);
    return [];
  }
}

module.exports = {
  buscarProductosITC,
};
