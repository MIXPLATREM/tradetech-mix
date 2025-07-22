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
      console.log("Resultado:", res.data);
      setResultado(res.data.resultado || []);
    } catch (err) {
      console.error('Error al procesar:', err);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        console.log('Enviando fetch con:', busqueda);
        const response = await axios.get(`${BACKEND_URL}/productos?q=${busqueda}`);
        console.log('Respuesta del backend:', response.data);
        setProductos(Array.isArray(response.data) ? response.data : []);
        console.log('🔍 SelectorTradetech cargado correctamente');
      } catch (err) {
        console.error('Error cargando productos ITC:', err);
        setProductos([]);
      }
    };

    if (busqueda.length >= 3) {
      fetchProductos();
    }
  }, [busqueda]);

  console.log("Productos cargados:", productos);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Selecciona los parámetros</h2>

      <select value={modo} onChange={e => setModo(e.target.value)} className="w-full mb-4 p-2 border rounded">
        <option value="">Selecciona tipo de operación</option>
        <option value="exportar">Exportar</option>
        <option value="importar">Importar</option>
      </select>

      <select
        value={origen}
        onChange={e => setOrigen(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Selecciona país de origen</option>
        <option value="México">México</option>
        <option value="Estados Unidos">Estados Unidos</option>
        <option value="Canadá">Canadá</option>
        <option value="Brasil">Brasil</option>
      </select>

      <select
        value={destino}
        onChange={e => setDestino(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Selecciona país de destino</option>
        <option value="México">México</option>
        <option value="Estados Unidos">Estados Unidos</option>
        <option value="Canadá">Canadá</option>
        <option value="Brasil">Brasil</option>
      </select>

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
            <option key={i} value={prod.codigo || prod.code}>
              {prod.nombre || prod.name} – {prod.codigo || prod.code}
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

      {resultado.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-3">📊 Resultados simulados de comercio internacional</h3>
          <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Año</th>
                <th className="px-4 py-2 text-left">Reportador</th>
                <th className="px-4 py-2 text-left">Socio</th>
                <th className="px-4 py-2 text-left">Flujo</th>
                <th className="px-4 py-2 text-left">Producto</th>
                <th className="px-4 py-2 text-left">Valor (USD)</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((fila, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{fila.year}</td>
                  <td className="px-4 py-2">{fila.reporter}</td>
                  <td className="px-4 py-2">{fila.partner}</td>
                  <td className="px-4 py-2">{fila.trade_flow}</td>
                  <td className="px-4 py-2">{fila.commodity}</td>
                  <td className="px-4 py-2">${fila.value_usd.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SelectorTradetech;
