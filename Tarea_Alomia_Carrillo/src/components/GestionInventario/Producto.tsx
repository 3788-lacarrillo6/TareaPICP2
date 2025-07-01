import React from "react";

interface ProductoProps {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  onActualizar: (id: number, nuevaCantidad: number) => void;
  onEliminar: (id: number) => void;
}

const Producto: React.FC<ProductoProps> = ({
  id,
  nombre,
  cantidad,
  precio,
  onActualizar,
  onEliminar,
}) => {
  return (
    <div className="producto">
      <h4>{nombre}</h4>
      <p>Precio: ${precio}</p>
      <p>Cantidad: {cantidad}</p>
      <button onClick={() => onActualizar(id, cantidad + 1)}>➕</button>
      <button onClick={() => onActualizar(id, cantidad - 1)}>➖</button>
      <button onClick={() => onEliminar(id)}>🗑️ Eliminar</button>
    </div>
  );
};

export default Producto;
