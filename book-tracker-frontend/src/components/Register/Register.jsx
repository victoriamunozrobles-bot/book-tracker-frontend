import { useState } from "react";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import "./Register.css";

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
    <div className={`register-popup ${isOpen ? "register-popup_opened" : ""}`}>
      <div className="register-popup__container">
        <button
          type="button"
          className="register-popup__close-button"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="register-popup__title">Inicia sesión</h2>
        <form
          className="register-popup__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className="register-popup__input"
            type="text"
            name="name"
            placeholder="Nombre"
            value={values.name || ""}
            onChange={handleChange}
            required
          />
          <input
            className="register-popup__input"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <span className="register-popup__error">{errors.email}</span>

          <input
            className="register-popup__input"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={values.password || ""}
            onChange={handleChange}
            required
            minLength="8"
          />

          <input
            className="register-popup__input"
            type="password"
            name="password"
            placeholder="Confirmar ontraseña"
            value={values.password || ""}
            onChange={handleChange}
            required
            minLength="8"
          />
          <span className="register-popup__error">{errors.password}</span>

          {apiError && (
            <span className="register-popup__error register-popup__error_api">
              {apiError}
            </span>
          )}

          <button
            className={`register-popup__button ${!isValid ? "register-popup__button_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            Inicia sesión
          </button>
        </form>

        <div className="register-popup__signup">
          <button
            type="button"
            className="register-popup__switch-link"
            onClick={onSwitchToRegister}
          >
            ¿Aún no eres miembro? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}
