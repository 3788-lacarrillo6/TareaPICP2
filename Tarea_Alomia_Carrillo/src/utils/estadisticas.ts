// src/utils/estadisticas.ts

export function calcularMedia(valores: number[]): number {
  const suma = valores.reduce((acc, val) => acc + val, 0);
  return +(suma / valores.length).toFixed(2);
}

export function calcularMediana(valores: number[]): number {
  const ordenados = [...valores].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);

  if (ordenados.length % 2 === 0) {
    return +((ordenados[mitad - 1] + ordenados[mitad]) / 2).toFixed(2);
  } else {
    return +ordenados[mitad].toFixed(2);
  }
}

export function calcularModa(valores: number[]): number | null {
  const frecuencias: { [key: number]: number } = {};
  valores.forEach((v) => {
    frecuencias[v] = (frecuencias[v] || 0) + 1;
  });

  const maxFrecuencia = Math.max(...Object.values(frecuencias));
  const modas = Object.keys(frecuencias)
    .map(Number)
    .filter((k) => frecuencias[k] === maxFrecuencia);

  if (modas.length === valores.length) return null; // Todos iguales o sin moda clara

  return +modas[0].toFixed(2); // Tomamos la primera moda
}

export function calcularVarianzaMuestral(valores: number[]): number {
  const media = calcularMedia(valores);
  const sumaCuadrados = valores.reduce((acc, v) => acc + (v - media) ** 2, 0);
  return +(sumaCuadrados / (valores.length - 1)).toFixed(2);
}

export function calcularVarianzaPoblacional(valores: number[]): number {
  const media = calcularMedia(valores);
  const sumaCuadrados = valores.reduce((acc, v) => acc + (v - media) ** 2, 0);
  return +(sumaCuadrados / valores.length).toFixed(2);
}

export function calcularDesviacionEstandarMuestral(valores: number[]): number {
  return +Math.sqrt(calcularVarianzaMuestral(valores)).toFixed(2);
}

export function calcularDesviacionEstandarPoblacional(valores: number[]): number {
  return +Math.sqrt(calcularVarianzaPoblacional(valores)).toFixed(2);
}

export function calcularRango(valores: number[]): number {
  return +(Math.max(...valores) - Math.min(...valores)).toFixed(2);
}

export function calcularMinimo(valores: number[]): number {
  return Math.min(...valores);
}

export function calcularMaximo(valores: number[]): number {
  return Math.max(...valores);
}
