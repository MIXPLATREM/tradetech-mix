const axios = require('axios');
const COMTRADE_TOKEN = 'e88dfa487518477cb8b047f7af06a6cf';

async function buscarProductosComtrade() {
  const combos = [
    { r: 'USA', p: 'WLD', rg: '1' },   // importaciones EE.UU. del mundo
    { r: 'USA', p: 'WLD', rg: '2' },   // exportaciones EE.UU. al mundo
    { r: 'all', p: 'all', rg: 'all' }  // datos globales generales
  ];

  for (const combo of combos) {
    try {
      const params = {
        max: 5,
        type: 'C',
        freq: 'A',
        px: 'HS',
        ps: '2022',
        cc: 'TOTAL',
        ...combo,
        fmt: 'json'
      };
      console.log('🔍 Probando combo:', combo);
      const { data } = await axios.get(
        'https://comtradeapi.un.org/api/get',
        { params, headers: { 'Ocp-Apim-Subscription-Key': COMTRADE_TOKEN } }
      );
      const count = Array.isArray(data.dataset) ? data.dataset.length : 0;
      console.log(`✅ Éxito con combo ${JSON.stringify(combo)} → registros:`, count);
      console.log(data.dataset[0] ?? {}); // muestra un ejemplo mínimo
      return;
    } catch (err) {
      console.warn('❌ Falló combo', combo, ':', err.response?.data || err.message);
    }
  }

  console.error('🚨 Todos los combos fallaron.');
}

buscarProductosComtrade();
