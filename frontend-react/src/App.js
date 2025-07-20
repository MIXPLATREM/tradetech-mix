import { useState } from 'react';
import './App.css';
import SelectorTradetech from './components/SelectorTradetech';

function App() {
  const [mostrarSelector, setMostrarSelector] = useState(false);

  if (mostrarSelector) {
    return <SelectorTradetech />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <img src="/logomix.jpg" alt="Logo MIX" className="w-40 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Bienvenido a MIX Tradetech</h1>
      <p className="mb-6">La plataforma de comercio internacional del futuro.</p>
      <button
        onClick={() => setMostrarSelector(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Ingresar a MIX Tradetech
      </button>
    </div>
  );
}

export default App;
