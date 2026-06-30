import { useState } from "react";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import "./register.css";

export default function Register({
  isOpen,
  onClose,
  handleRegister,
  onSwitchToLogin,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const [apiError, setApiError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setApiError("Las contraseñas no coinciden.");
      return;
    }

    setApiError("");
    handleRegister(values.name, values.email, values.password).catch((err) => {
      console.error("Detalle técnico del error:", err);
      setApiError("Hubo un error al registrar el usuario.");
    });
  };

  const isFormCompletelyValid =
    isValid && values.password === values.confirmPassword;

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

        <h2 className="register-popup__title">REGÍSTRATE</h2>

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
            minLength="2"
          />
          <span className="register-popup__error">{errors.name}</span>

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
          <span className="register-popup__error">{errors.password}</span>

          <input
            className="register-popup__input"
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={values.confirmPassword || ""}
            onChange={handleChange}
            required
          />
          <span className="register-popup__error">
            {values.confirmPassword &&
            values.password !== values.confirmPassword
              ? "Las contraseñas no coinciden"
              : ""}
          </span>

          {apiError && (
            <span className="register-popup__error register-popup__error_api">
              {apiError}
            </span>
          )}

          <button
            className={`register-popup__button ${!isFormCompletelyValid ? "register-popup__button_disabled" : ""}`}
            type="submit"
            disabled={!isFormCompletelyValid}
          >
            REGÍSTRATE
          </button>
        </form>

        <div className="register-popup__signup">
          <button
            type="button"
            className="register-popup__switch-link"
            onClick={onSwitchToLogin}
          >
            ¿Ya eres miembro? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}
