
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import CalculadoraEstadistica from "./components/CalculadoraEstadistica";
import SistemaEcuaciones3x3 from "./components/SistemaEcuaciones";

import Inventario from "./components/GestionInventario/Inventario";

import './App.css'
import Informacion from "./components/Informacion";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: '20px', marginTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/calculos" element={<CalculadoraEstadistica />} />
          <Route path="/ecuaciones" element={<SistemaEcuaciones3x3 />} />
           <Route path="/informacion" element={<Informacion />} />
           <Route path="/inventario" element={<Inventario />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App
