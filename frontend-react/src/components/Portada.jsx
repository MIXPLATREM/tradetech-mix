import React from 'react';
import { useNavigate } from 'react-router-dom';

const logo = '/logomix.png'; // acceso correcto desde carpeta public

const Portada = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">
      <img src={logo} alt="Logo MIX" className="w-32 h-32 mb-6" />
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Trade Tech Mix</h1>
      <p className="text-xl text-gray-700 mb-6">Transformando el comercio global con tecnología</p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-blue-700 transition"
        onClick={() => navigate('/resultados')}
      >
        Entrar a la app
      </button>
    </div>
  );
};

export default Portada;
