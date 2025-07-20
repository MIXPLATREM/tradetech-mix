import React, { useEffect, useState } from 'react';

const Resultados = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('https://tradetech-mix.onrender.com/mock-preview')
      .then(res => res.json())
      .then(data => setDatos(data.resultado || []))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Resultados de Comercio</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Año</th>
            <th className="p-2 border">Origen</th>
            <th className="p-2 border">Destino</th>
            <th className="p-2 border">Flujo</th>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Valor (USD)</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{item.year}</td>
              <td className="border p-2">{item.reporter}</td>
              <td className="border p-2">{item.partner}</td>
              <td className="border p-2">{item.trade_flow}</td>
              <td className="border p-2">{item.commodity}</td>
              <td className="border p-2">${item.value_usd.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resultados;
