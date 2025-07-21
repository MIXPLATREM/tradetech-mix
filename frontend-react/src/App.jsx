import { Routes, Route } from 'react-router-dom';
import Portada from './components/Portada';
// import Resultados from './components/Resultados'; // solo si lo tienes

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portada />} />
      {/* <Route path="/resultados" element={<Resultados />} /> */}
    </Routes>
  );
}

export default App;
