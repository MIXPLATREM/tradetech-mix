import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portada from './components/Portada';
import SelectorTradetech from './components/SelectorTradetech';
import Resultados from './components/Resultados'; // si deseas mantenerlo

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portada />} />
      <Route path="/seleccion" element={<SelectorTradetech />} />
      <Route path="/resultados" element={<Resultados />} /> {/* opcional */}
    </Routes>
  );
}

export default App;
