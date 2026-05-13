import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import AdminPanel from "./pages/AdminPanel"
import { getCurrentUserRole } from "./services/auth"

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const role = await getCurrentUserRole()
        setIsAdmin(role === "admin")
      } catch (error) {
        console.error("Error al validar el rol:", error.message)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    checkAdminRole()
  }, [])

  if (loading) return <p style={{ padding: 24 }}>Validando permisos...</p>

  return isAdmin ? children : <Navigate to="/dashboard" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App
