import React from "react";

const usuarios = [
  { id: 1, nombre: "Diana Ornelas", correo: "diana@email.com", rol: "admin" },
  { id: 2, nombre: "Carlos Pérez", correo: "carlos@email.com", rol: "usuario" },
  { id: 3, nombre: "Ana López", correo: "ana@email.com", rol: "entrenador" },
];

export default function AdminPanel() {
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Gym Admin</h2>
        <nav>
          <p style={styles.menuItem}>Usuarios</p>
          <p style={styles.menuItem}>Rutinas</p>
          <p style={styles.menuItem}>Pagos</p>
          <p style={styles.menuItem}>Reportes</p>
        </nav>
      </aside>

      <main style={styles.main}>
        <h1 style={styles.title}>Panel administrativo</h1>
        <p style={styles.subtitle}>
          Gestión de usuarios registrados en la plataforma.
        </p>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Usuarios</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Correo</th>
                <th style={styles.th}>Rol</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td style={styles.td}>{usuario.nombre}</td>
                  <td style={styles.td}>{usuario.correo}</td>
                  <td style={styles.td}>{usuario.rol}</td>
                  <td style={styles.td}>
                    <button style={styles.button}>Editar</button>
                    <button style={styles.deleteButton}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f8",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1f2937",
    color: "white",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  menuItem: {
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#374151",
    marginBottom: "10px",
  },
  main: {
    flex: 1,
    padding: "30px",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#e5e7eb",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
  },
  button: {
    padding: "8px 12px",
    marginRight: "8px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#dc2626",
    color: "white",
    cursor: "pointer",
  },
};