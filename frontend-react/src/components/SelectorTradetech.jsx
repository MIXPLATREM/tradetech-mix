import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectorTradetech = () => {
  const [modo, setModo] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [producto, setProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState([]);

  const BACKEND_URL = 'https://tradetech-mix-backend3.onrender.com';

  const manejarProceso = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/mock-preview`);
      setResultado(res.data.resultado);
    } catch (err) {
      console.error('Error obteniendo datos simulados:', err);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        console.log('Enviando fetch con:', busqueda);
        const response = await axios.get(`${BACKEND_URL}/productos?q=${busqueda}`);
        console.log('Respuesta del backend:', response.data);
        setProductos(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error cargando productos ITC:', err);
        setProductos([]);
      }
    };

    if (busqueda.length >= 3) {
      fetchProductos();
    }
  }, [busqueda]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Selecciona los parámetros</h2>

      <select value={modo} onChange={e => setModo(e.target.value)} className="w-full mb-4 p-2 border rounded">
        <option value="">Selecciona tipo de operación</option>
        <option value="exportar">Exportar</option>
        <option value="importar">Importar</option>
      </select>

      <input
        type="text"
        placeholder="País de origen"
        value={origen}
        onChange={e => setOrigen(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="País de destino"
        value={destino}
        onChange={e => setDestino(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      {productos.length > 0 && (
        <select
          value={producto}
          onChange={e => setProducto(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Selecciona un producto</option>
          {productos.map((prod, i) => (
            <option key={i} value={prod.code}>
              {prod.name} ({prod.code})
            </option>
          ))}
        </select>
      )}

      <button
        onClick={manejarProceso}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Consultar
      </button>
    </div>
  );
};

export default SelectorTradetech;
