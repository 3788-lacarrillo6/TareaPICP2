export type Matriz3x3 = number[][];
export type Vector3 = number[];

export function calcularDeterminante3x3(matriz: Matriz3x3): number {
  const [
    [a, b, c],
    [d, e, f],
    [g, h, i]
  ] = matriz;

  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

export function reemplazarColumna(
  matriz: Matriz3x3,
  columna: number,
  nuevaColumna: Vector3
): Matriz3x3 {
  return matriz.map((fila, i) =>
    fila.map((val, j) => (j === columna ? nuevaColumna[i] : val))
  );
}

export function resolverCramer(
  matriz: Matriz3x3,
  vector: Vector3
): { tipo: "unica"; x: number; y: number; z: number } | { tipo: "singular" } {
  const detA = calcularDeterminante3x3(matriz);
  if (detA === 0) return { tipo: "singular" };

  const detAx = calcularDeterminante3x3(reemplazarColumna(matriz, 0, vector));
  const detAy = calcularDeterminante3x3(reemplazarColumna(matriz, 1, vector));
  const detAz = calcularDeterminante3x3(reemplazarColumna(matriz, 2, vector));

  return {
    tipo: "unica",
    x: detAx / detA,
    y: detAy / detA,
    z: detAz / detA
  };
}
