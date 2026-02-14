
import { signOut } from "../services/auth";

export default function Dashboard() {


  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h2>Dashboard</h2>
      <p>Bienvenido a Cocoa Gym</p>
      <button onClick={signOut} style={{ marginTop: 16 }}>
        Cerrar sesión
      </button>
    </div>
  );
}
