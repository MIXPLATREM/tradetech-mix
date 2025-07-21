import React from 'react';

const Portada = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <img src="/logomix.jpg" alt="Logo MIX" className="w-40 mb-6" />
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Trade Tech Mix</h1>
      <p className="mb-6">Innovación y futuro del comercio internacional.</p>
      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg shadow-md">
        Iniciar
      </button>
    </div>
  );
};

export default Portada;

