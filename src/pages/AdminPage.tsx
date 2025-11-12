// src/pages/AdminPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/protected/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => {
        setError("No tienes permiso para acceder a esta página.");
        setTimeout(() => navigate("/"), 3000);
      });
  }, [navigate]);

  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  if (!user) return <div>Cargando...</div>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user.name}</p>
      <p>Rol: <strong>{user.role}</strong></p>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => alert("Gestión de productos próximamente")}>
          🛞 Gestionar Productos
        </button>
        <button onClick={() => alert("Gestión de usuarios próximamente")} style={{ marginLeft: "1rem" }}>
          👤 Gestionar Usuarios
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
