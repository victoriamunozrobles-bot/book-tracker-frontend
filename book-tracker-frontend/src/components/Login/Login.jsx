import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import logo from "../../images/logo.svg";

export default function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    handleLogin(values.email, values.password).catch((err) => {
      console.error("Detalle técnico del error:", err);
      setApiError("Correo o contraseña incorrectos.");
    });
  };

  return (
    <div className="login">
      <div className="register__logo-container">
        <img src={logo} alt="Logo de Book Tracker" className="register__logo" />
      </div>
      <h2 className="login__title">Inicia sesión</h2>
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <input
          className="login_form__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="login__error">{errors.email}</span>

        <input
          className="login_form__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={values.password || ""}
          onChange={handleChange}
          required
          minLength="8"
        />
        <span className="login__error">{errors.password}</span>

        {apiError && (
          <span className="login__error login__error_api">{apiError}</span>
        )}

        <button
          className={`login_form__button ${!isValid ? "login_form__button_disabled" : ""}`}
          type="submit"
          disabled={!isValid}
        >
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
