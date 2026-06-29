import { useState } from "react";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import "./Login.css";

export default function Login({
  isOpen,
  onClose,
  handleLogin,
  onSwitchToRegister,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    handleLogin(values.email, values.password).catch((err) => {
      console.error(err);
      setApiError("Correo o contraseña incorrectos.");
    });
  };

  return (
    <div className={`login-popup ${isOpen ? "login-popup_opened" : ""}`}>
      <div className="login-popup__container">
        <button
          type="button"
          className="login-popup__close-button"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="login-popup__title">Inicia sesión</h2>
        <form className="login-popup__form" onSubmit={handleSubmit} noValidate>
          <input
            className="login-popup__input"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <span className="login-popup__error">{errors.email}</span>

          <input
            className="login-popup__input"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={values.password || ""}
            onChange={handleChange}
            required
            minLength="8"
          />
          <span className="login-popup__error">{errors.password}</span>

          {apiError && (
            <span className="login-popup__error login-popup__error_api">
              {apiError}
            </span>
          )}

          <button
            className={`login-popup__button ${!isValid ? "login-popup__button_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            Inicia sesión
          </button>
        </form>

        <div className="login-popup__signup">
          <button
            type="button"
            className="login-popup__switch-link"
            onClick={onSwitchToRegister}
          >
            ¿Aún no eres miembro? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}
