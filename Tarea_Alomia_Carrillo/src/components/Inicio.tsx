import React from "react";

const Inicio = () => (
  <main
    style={{
      maxWidth: "600px",
      margin: "3rem auto",
      padding: "2rem",
      borderRadius: "12px",
      backgroundColor: "#f0f4f8",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    }}
  >
    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "700" }}>
      ¡Bienvenido!
    </h1>
    <p style={{ fontSize: "1.25rem", marginBottom: "2rem", lineHeight: "1.6" }}>
      Esta es tu aplicación de algebra lineal, diseñada para ayudarte a
      dominar conceptos y resolver problemas con facilidad.
    </p>
    <div className="p-4"><strong>Integrantes:</strong> Alomia Johan, Carrillo Luis</div>;
   
  </main>
);

export default Inicio;
