import { useState } from "react"
import { Link } from "react-router-dom"

export default function Register() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setSuccess("")

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Por favor completa todos los campos.")
      return
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

  
    console.log("Registro con:", { fullName, email, password })
    setSuccess("¡Registro exitoso!")
  }

  return (
    <div className="page">
      <div className="big-title">Cocoa Gym</div>
      <div className="card">
        <h1 className="title">Crear cuenta</h1>
        <p className="subtitle">Regístrate para acceder a Cocoa Gym</p>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Nombre completo
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nombre y apellidos"
              className="input"
            />
          </label>

          <label className="label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplocorreo@gmail.com"
              className="input"
            />
          </label>

          <label className="label">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="input"
            />
          </label>

          <label className="label">
            Validar contraseña
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma la contraseña"
              className="input"
            />
          </label>

          <button type="submit" className="button">
            Registrarme
          </button>
        </form>

        <p className="footerText">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
   