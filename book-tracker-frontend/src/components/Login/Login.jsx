import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleLogin(email, password);
    handleLogin(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__title">Inicia sesión</h2>
      <form className={"login__form"} onSubmit={handleSubmit}>
        <input
          className="login_form__input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          className="login_form__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <button className="login_form__button" type="submit">
          Inicia sesión
        </button>
      </form>
      <div className="login__signup">
        <Link className="login__signup_link" to="/signup">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
