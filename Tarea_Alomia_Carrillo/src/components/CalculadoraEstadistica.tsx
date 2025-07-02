// Importa React y el hook useState
import React, { useState } from "react";
// Importa el archivo CSS para estilos
import "../CalculadoraEstadistica.css";
// Importa todas las funciones estadísticas desde el archivo de utilidades
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

// Componente funcional principal
const CalculadoraEstadistica: React.FC = () => {
  // Estado para guardar el texto ingresado por el usuario
  const [input, setInput] = useState("");
  // Estado para mostrar errores si los hay
  const [errores, setErrores] = useState<string | null>(null);
  // Estado para almacenar los resultados estadísticos
  const [resultados, setResultados] = useState<{ [key: string]: number | string }>({});

  // Función que se ejecuta cuando cambia el contenido del textarea
  const manejarCambio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value); // Actualiza el texto ingresado
    setErrores(null); // Limpia cualquier mensaje de error anterior
  };

  // Limpia todos los campos: texto, errores y resultados
  const limpiar = () => {
    setInput("");
    setResultados({});
    setErrores(null);
  };

  // Función que procesa los datos y calcula estadísticas
  const calcular = () => {
    // Convierte el texto en un arreglo de números
    const datos = input
      .split(/[\s,;\n]+/)     // Separa por espacio, coma, punto y coma o salto de línea
      .map((val) => val.trim()) // Elimina espacios adicionales
      .filter((val) => val !== "") // Quita valores vacíos
      .map(Number);           // Convierte cada valor a número

    // Verifica si alguno no es un número
    if (datos.some(isNaN)) {
      setErrores("Ingrese solo valores numéricos válidos.");
      setResultados({});
      return;
    }

    // Verifica que haya al menos dos valores
    if (datos.length < 2) {
      setErrores("Ingrese al menos dos valores numéricos.");
      setResultados({});
      return;
    }

    // Calcula la moda por separado porque puede ser null
    const moda = calcularModa(datos);

    // Si no hay moda, muestra advertencia pero continúa
    if (moda === null) {
      setErrores("No hay una moda clara: todos los valores son únicos.");
    }

    // Guarda todos los resultados estadísticos en el estado
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

  // Renderizado del componente
  return (
    <div className="calculadora-estadistica">
      <h2>Calculadora Estadística</h2>
<div className="entrada">
   {/* Área de texto para ingresar los números */}
      <textarea
        value={input}
        onChange={manejarCambio}
        placeholder="Ingrese números separados por comas, espacios o saltos de línea"
        rows={6}
      />

      {/* Muestra error si hay */}
      {errores && <p className="error">{errores}</p>}

      {/* Botones de acción */}
      <div className="botones">
        <button onClick={calcular} disabled={!input.trim()}>Calcular</button>
        <button onClick={limpiar}>Limpiar datos</button>
      </div>
  </div>
      

      {/* Resultados estadísticos */}
      {Object.keys(resultados).length > 0 && (
        <div className="resultados">
          <h3>Resultados:</h3>
          <ul>
            {/* Muestra cada resultado como una lista */}
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

// Exporta el componente para poder usarlo en otras partes de la app
export default CalculadoraEstadistica;
