import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SelectorTradetech = () => {
  const [modo, setModo] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [producto, setProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState([]);

  const manejarProceso = async () => {
    try {
      const res = await axios.get('http://localhost:3001/mock-preview');
      setResultado(res.data.resultado);
    } catch (err) {
      console.error('Error obteniendo datos simulados:', err);
    }
  };

  const paises = ['México', 'Estados Unidos', 'Colombia', 'Brasil', 'Canadá'];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(`/productos?q=${busqueda}`);
        setProductos(res.data);
      } catch (err) {
        console.error('Error cargando productos ITC:', err);
      }
    };

    if (busqueda.length >= 3) {
      fetchProductos();
    }
  }, [busqueda]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Selecciona tu operación</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setModo('Exportar')}
          className={`px-4 py-2 rounded-lg font-semibold shadow ${modo === 'Exportar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Exportar
        </button>
        <button
          onClick={() => setModo('Importar')}
          className={`px-4 py-2 rounded-lg font-semibold shadow ${modo === 'Importar' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Importar
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">País de Origen</label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        >
          <option value="">Selecciona un país</option>
          {paises.map((pais) => (
            <option key={pais} value={pais}>{pais}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">País de Destino</label>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        >
          <option value="">Selecciona un país</option>
          {paises.map((pais) => (
            <option key={pais} value={pais}>{pais}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Buscar Producto</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mb-2"
          placeholder="Ej. limón, mango..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {productos.map((prod, index) => (
            <option key={index} value={prod.name}>{prod.name} - {prod.code}</option>
          ))}
        </select>
      </div>

      <button
        onClick={manejarProceso}
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700"
      >
        Procesar
      </button>

      {resultado.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Resultados:</h3>

          <table className="w-full text-sm border border-gray-300 mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Año</th>
                <th className="border px-2 py-1">Origen</th>
                <th className="border px-2 py-1">Destino</th>
                <th className="border px-2 py-1">Flujo</th>
                <th className="border px-2 py-1">Valor (USD)</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{item.year}</td>
                  <td className="border px-2 py-1">{item.reporter}</td>
                  <td className="border px-2 py-1">{item.partner}</td>
                  <td className="border px-2 py-1">{item.trade_flow}</td>
                  <td className="border px-2 py-1">${(item.value_usd / 1e9).toFixed(2)}B</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-bold mb-2">Gráfico de Valor Comercial</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resultado}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value_usd" stroke="#8884d8" name="USD" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectorTradetech;
