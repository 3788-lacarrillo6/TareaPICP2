import React from "react";
import "./Inventario.css";

interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface FichaProductoProps {
  productos: Producto[];
  onActualizar: (id: number, nuevaCantidad: number) => void;
  onEliminar: (id: number) => void;
}

const FichaProducto: React.FC<FichaProductoProps> = ({ productos, onActualizar, onEliminar }) => {
  return (
    <table className="tabla-inventario">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio ($)</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
        {//se recorre el arreglo de productos
        productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.nombre}</td>
            <td>{producto.precio.toFixed(2)}</td>{/*cuántos decimales deseas*/}
            <td>{producto.cantidad}</td>
            <td>
              <button onClick={() => onEliminar(producto.id)} className="eliminar">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FichaProducto;
