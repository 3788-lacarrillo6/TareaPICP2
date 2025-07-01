// src/components/Calculadora/CalculadoraEstadistica.tsx
import React, { useState } from "react";
import "../CalculadoraEstadistica.css";
import {
  calcularMedia,
  calcularMediana,
  calcularModa,
  calcularVarianzaMuestral,
  calcularVarianzaPoblacional,
  calcularDesviacionEstandarMuestral,
  calcularDesviacionEstandarPoblacional,
  calcularRango,
  calcularMinimo,
  calcularMaximo
} from "../utils/estadisticas";

const CalculadoraEstadistica: React.FC = () => {
  const [input, setInput] = useState("");
  const [errores, setErrores] = useState<string | null>(null);
  const [resultados, setResultados] = useState<{ [key: string]: number | string }>({});

  const manejarCambio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setErrores(null);
  };

  const limpiar = () => {
    setInput("");
    setResultados({});
    setErrores(null);
  };

  const calcular = () => {
    const datos = input
      .split(/[\s,;\n]+/)
      .map((val) => val.trim())
      .filter((val) => val !== "")
      .map(Number);

    if (datos.some(isNaN)) {
      setErrores("❌ Ingrese solo valores numéricos válidos.");
      setResultados({});
      return;
    }

    if (datos.length < 2) {
      setErrores("❌ Ingrese al menos dos valores numéricos.");
      setResultados({});
      return;
    }

    const moda = calcularModa(datos);

    if (moda === null) {
      setErrores("⚠️ No hay una moda clara: todos los valores son únicos.");
    }

    setResultados({
      "Media": calcularMedia(datos),
      "Mediana": calcularMediana(datos),
      "Moda": moda !== null ? moda : "No definida",
      "Varianza Muestral": calcularVarianzaMuestral(datos),
      "Varianza Poblacional": calcularVarianzaPoblacional(datos),
      "Desviación Estándar (Muestra)": calcularDesviacionEstandarMuestral(datos),
      "Desviación Estándar (Población)": calcularDesviacionEstandarPoblacional(datos),
      "Rango": calcularRango(datos),
      "Mínimo": calcularMinimo(datos),
      "Máximo": calcularMaximo(datos)
    });
  };

  return (
    <div className="calculadora-estadistica">
      <h2>Calculadora Estadística</h2>
      <textarea
        value={input}
        onChange={manejarCambio}
        placeholder="Ingrese números separados por comas, espacios o saltos de línea"
        rows={6}
      />
      {errores && <p className="error">{errores}</p>}
      <div className="botones">
        <button onClick={calcular} disabled={!input.trim()}>Calcular</button>
        <button onClick={limpiar}>Limpiar datos</button>
      </div>
      {Object.keys(resultados).length > 0 && (
        <div className="resultados">
          <h3>Resultados:</h3>
          <ul>
            {Object.entries(resultados).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalculadoraEstadistica;
