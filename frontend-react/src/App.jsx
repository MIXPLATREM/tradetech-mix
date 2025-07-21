import { Routes, Route } from 'react-router-dom';
import Portada from './components/Portada';
// Si aún no tienes Resultados.jsx, puedes comentar la siguiente línea:
// import Resultados from './components/Resultados';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portada />} />
      {/* <Route path="/resultados" element={<Resultados />} /> */}
    </Routes>
  );
}

export default App;
