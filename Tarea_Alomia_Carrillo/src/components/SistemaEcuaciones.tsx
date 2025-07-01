import React, { useState } from "react";
import { resolverCramer } from "../utils/matematicas";
import '../SistemaEcuaciones3x3.css';

const SistemaEcuaciones3x3: React.FC = () => {
  const [coeficientes, setCoeficientes] = useState<string[][]>(
    Array(3).fill(null).map(() => Array(3).fill(""))
  );

  const [terminos, setTerminos] = useState<string[]>(Array(3).fill(""));
  const [resultado, setResultado] = useState<null | { x: number; y: number; z: number }>(null);
  const [error, setError] = useState<string>("");

  const handleCambioCoef = (i: number, j: number, valor: string) => {
    const nuevo = [...coeficientes];
    nuevo[i][j] = valor;
    setCoeficientes(nuevo);
  };

  const handleCambioTerm = (i: number, valor: string) => {
    const nuevo = [...terminos];
    nuevo[i] = valor;
    setTerminos(nuevo);
  };

  const validarEntradas = (): boolean => {
    return coeficientes.every(fila =>
      fila.every(val => !isNaN(Number(val)))
    ) && terminos.every(val => !isNaN(Number(val)));
  };

  const resolver = () => {
    setError("");
    if (!validarEntradas()) {
      setError("Todos los campos deben contener números válidos.");
      setResultado(null);
      return;
    }

    const matriz = coeficientes.map(fila => fila.map(Number));
    const vector = terminos.map(Number);
    const solucion = resolverCramer(matriz, vector);

    if (solucion.tipo === "singular") {
      setError("Matriz singular: El sistema no tiene solución única.");
      setResultado(null);
    } else {
      setResultado(solucion);
    }
  };

  return (
    <div className="sistema-container">
      <h2 className="sistema-title">Sistema de Ecuaciones 3x3</h2>

      <div className="grid-ecuacion">
        {coeficientes.map((fila, i) =>
          fila.map((val, j) => (
            <input
              key={`a-${i}-${j}`}
              className="border p-2 text-center"
              type="text"
              value={val}
              onChange={(e) => handleCambioCoef(i, j, e.target.value)}
              placeholder={`a${i + 1}${j + 1}`}
            />
          ))
        )}
        {terminos.map((val, i) => (
          <input
            key={`b-${i}`}
            className="border p-2 text-center"
            type="text"
            value={val}
            onChange={(e) => handleCambioTerm(i, e.target.value)}
            placeholder={`b${i + 1}`}
          />
        ))}
      </div>

      <button
        className="boton-resolver"
        onClick={resolver}
        disabled={!validarEntradas()}
      >
        Resolver
      </button>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {resultado && (
        <div className="resultado ">
          <h3 className="font-semibold mb-2">Solución:</h3>
          <p>x = {resultado.x.toFixed(4)}</p>
          <p>y = {resultado.y.toFixed(4)}</p>
          <p>z = {resultado.z.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default SistemaEcuaciones3x3;
