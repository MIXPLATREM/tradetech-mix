import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portada from './components/Portada';
import Resultados from './components/Resultados';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portada />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </Router>
  );
}

export default App;

