import React, { useState } from "react";
import FichaProducto from "./FichaProducto";
import "./Inventario.css";


interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

const Inventario: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const agregarProducto = () => {
    if (!nombre || cantidad <= 0 || precio <= 0) {
      setMensaje("Ingrese datos válidos para el nuevo producto.");
      return;
    }

    const nuevo: Producto = {
      id: Date.now(), // ID único
      nombre,
      cantidad,
      precio,
    };

    setProductos([...productos, nuevo]);
    setNombre("");
    setCantidad(0);
    setPrecio(0);
    setMensaje("Producto agregado correctamente.");
  };

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad < 0) return;

    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
    setMensaje("🗑️ Producto eliminado.");
  };

  return (
    <div className="inventario">
      <h2>Gestión de Inventario</h2>

      <div className="formulario">
        <div>Nombre del producto</div>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <div>Cantidad:</div>
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
        />
        <div>Precio unitario</div>
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(parseFloat(e.target.value))}
        />
        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <FichaProducto
        productos={productos}
        onActualizar={updateCantidad => actualizarCantidad}
        onEliminar={eliminarProducto}
      />
    </div>
  );
};

export default Inventario;
