import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserRole, signOut } from "../services/auth";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const role = await getCurrentUserRole();
        setIsAdmin(role === "admin");
      } catch (error) {
        console.error("Error al validar el rol:", error.message);
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, []);

  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h2>Dashboard</h2>
      <p>Bienvenido a Cocoa Gym</p>

      {isAdmin && (
        <Link to="/admin">
          <button style={{ marginTop: 16 }}>Panel administrativo</button>
        </Link>
      )}

      <br />

      <button onClick={signOut} style={{ marginTop: 16 }}>
        Cerrar sesion
      </button>
    </div>
  );
}
