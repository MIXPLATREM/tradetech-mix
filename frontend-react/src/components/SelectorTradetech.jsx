import React, { useState, useEffect } from 'react';
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

  const BACKEND_URL = 'https://tradetech-mix.onrender.com';

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
        const res = await axios.get(`${BACKEND_URL}/productos?q=${busqueda}`);
        console.log('Respuesta del backend:', res.data);
        setProductos(Array.isArray(res.data) ? res.data : []);
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
      {/* …resto del código igual, usando productos.map... */}
    </div>
  );
};

export default SelectorTradetech;
