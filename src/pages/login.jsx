import { useState } from "react"
import { Link } from "react-router-dom"

import "../global.style.css"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e) {
    e.preventDefault() 

    if (!email || !password) {
      setError("Por favor completa el email y contraseña.")
      return
    }
    setError("")

    console.log("Login con:", { email, password })
    alert("Login correcto")
  }

  return (
    <div className="page">
      <div className="big-title">Cocoa Gym</div>
      <div className="card">
        <h1 className="title">Iniciar sesión</h1>
        <p className="subtitle">Accede a tu cuenta</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
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
              placeholder="••••••••"
              className="input"
            />
          </label>

          <button type="submit" className="button">
            Entrar
          </button>
        </form>

        <p className="footerText">
          ¿Aún no tienes cuenta?{" "}
          <Link to="/register" className="link">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}

