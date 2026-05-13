import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUserProfile, signOut } from "../services/auth";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentProfile = await getCurrentUserProfile();
        setProfile(currentProfile);
      } catch (error) {
        console.error("Error al cargar el perfil:", error.message);
        setError("No pudimos cargar tu informacion. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesion:", error.message);
      setError("No pudimos cerrar la sesion. Intenta de nuevo.");
    }
  };

  const userInitial = profile?.fullName?.trim()?.charAt(0)?.toUpperCase() || "U";
  const isAdmin = profile?.role === "admin";

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <div>
            <p style={styles.kicker}>Cocoa Gym</p>
            <h1 style={styles.title}>Mi dashboard</h1>
            <p style={styles.subtitle}>
              Consulta tu informacion de cuenta y el estado de tu membresia.
            </p>
          </div>

          <button type="button" onClick={handleSignOut} style={styles.secondaryButton}>
            Cerrar sesion
          </button>
        </header>

        {loading && <div style={styles.notice}>Cargando informacion...</div>}
        {error && <div style={styles.error}>{error}</div>}

        {!loading && profile && (
          <div style={styles.grid}>
            <section style={styles.profileCard}>
              <div style={styles.avatar}>{userInitial}</div>
              <div>
                <p style={styles.cardLabel}>Bienvenido</p>
                <h2 style={styles.name}>{profile.fullName || "Usuario Cocoa Gym"}</h2>
                <p style={styles.email}>{profile.email}</p>
              </div>
              <span style={styles.activeBadge}>Suscripcion activa</span>
            </section>

            <section style={styles.infoCard}>
              <h3 style={styles.sectionTitle}>Informacion de usuario</h3>

              <div style={styles.infoList}>
                <InfoItem label="Nombre" value={profile.fullName || "Sin nombre registrado"} />
                <InfoItem label="Correo" value={profile.email} />
                <InfoItem label="Rol" value={formatRole(profile.role)} />
                <InfoItem label="Estado de la suscripcion" value="Activo" highlight />
              </div>

              {isAdmin && (
                <Link to="/admin" style={styles.adminLink}>
                  Panel administrativo
                </Link>
              )}
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

function InfoItem({ label, value, highlight = false }) {
  return (
    <div style={styles.infoItem}>
      <span style={styles.infoLabel}>{label}</span>
      <span style={highlight ? styles.highlightValue : styles.infoValue}>{value}</span>
    </div>
  );
}

function formatRole(role) {
  if (!role) return "Sin rol";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #F1F3E0 0%, #D2DCB6 52%, #A1BC98 100%)",
    padding: "32px 18px",
    color: "#243126",
    fontFamily: "Arial, sans-serif",
  },
  shell: {
    width: "100%",
    maxWidth: "980px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "18px",
    marginBottom: "24px",
  },
  kicker: {
    margin: "0 0 6px",
    color: "#6E5034",
    fontSize: "15px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  title: {
    margin: 0,
    color: "#2F3D31",
    fontSize: "42px",
    lineHeight: 1,
  },
  subtitle: {
    margin: "10px 0 0",
    color: "#536158",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  profileCard: {
    minHeight: "360px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "18px",
    padding: "28px",
    background: "#2F3D31",
    color: "white",
    boxShadow: "0 20px 45px rgba(47, 61, 49, 0.24)",
  },
  avatar: {
    width: "86px",
    height: "86px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "#D2DCB6",
    color: "#2F3D31",
    fontSize: "38px",
    fontWeight: 800,
  },
  cardLabel: {
    margin: "0 0 8px",
    color: "#D2DCB6",
    fontSize: "14px",
    fontWeight: 700,
  },
  name: {
    margin: 0,
    fontSize: "30px",
    lineHeight: 1.1,
  },
  email: {
    margin: "10px 0 0",
    color: "#E6ECD5",
    overflowWrap: "anywhere",
  },
  activeBadge: {
    alignSelf: "flex-start",
    borderRadius: "999px",
    padding: "9px 14px",
    background: "rgba(210, 220, 182, 0.16)",
    border: "1px solid rgba(210, 220, 182, 0.45)",
    color: "#F1F3E0",
    fontSize: "14px",
    fontWeight: 700,
  },
  infoCard: {
    borderRadius: "18px",
    padding: "28px",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 20px 45px rgba(47, 61, 49, 0.14)",
  },
  sectionTitle: {
    margin: "0 0 18px",
    color: "#2F3D31",
    fontSize: "24px",
  },
  infoList: {
    display: "grid",
    gap: "12px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    padding: "16px",
    borderRadius: "14px",
    background: "#F7F8EE",
    border: "1px solid #E5E9D4",
  },
  infoLabel: {
    color: "#697466",
    fontSize: "14px",
    fontWeight: 700,
  },
  infoValue: {
    color: "#263326",
    fontSize: "16px",
    fontWeight: 800,
    textAlign: "right",
    overflowWrap: "anywhere",
  },
  highlightValue: {
    borderRadius: "999px",
    padding: "6px 12px",
    background: "#D2DCB6",
    color: "#2F3D31",
    fontSize: "15px",
    fontWeight: 900,
  },
  adminLink: {
    display: "inline-flex",
    marginTop: "18px",
    borderRadius: "10px",
    padding: "11px 16px",
    background: "#6E5034",
    color: "white",
    textDecoration: "none",
    fontWeight: 800,
  },
  secondaryButton: {
    border: "none",
    borderRadius: "10px",
    padding: "11px 16px",
    background: "#2F3D31",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  notice: {
    borderRadius: "14px",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.82)",
    color: "#536158",
    fontWeight: 700,
  },
  error: {
    borderRadius: "14px",
    padding: "16px",
    background: "#FEE2E2",
    border: "1px solid #FCA5A5",
    color: "#991B1B",
    fontWeight: 700,
  },
};
