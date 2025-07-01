import React from "react";
import "./Inventario.css"; // Importa estilos para la tabla

// Define la estructura que debe tener cada producto
interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

// Define los props (propiedades) que recibe el componente FichaProducto
interface FichaProductoProps {
  productos: Producto[]; // Lista de productos a mostrar
  onActualizar: (id: number, nuevaCantidad: number) => void; // Función para actualizar cantidad
  onEliminar: (id: number) => void; // Función para eliminar un producto
}

// Componente funcional que muestra la tabla de productos
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
        {
          // Recorre el arreglo de productos y crea una fila por cada uno
          productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.precio.toFixed(2)}</td> {/* Muestra el precio con 2 decimales */}
              <td>{producto.cantidad}</td>
              <td>
                {/* Botón para eliminar el producto usando la función recibida por props */}
                <button onClick={() => onEliminar(producto.id)} className="eliminar">Eliminar</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default FichaProducto;
