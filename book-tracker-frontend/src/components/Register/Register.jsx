import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../utils/useFormAndValidation";

export default function Register({ handleRegister }) {
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
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <input
          className="register_form__input"
          type="text"
          name="name"
          placeholder="Nombre"
          value={values.name || ""}
          onChange={handleChange}
          required
          minLength="2"
        />
        <span className="register__error">{errors.name}</span>

        <input
          className="register_form__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="register__error">{errors.email}</span>

        <input
          className="register_form__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={values.password || ""}
          onChange={handleChange}
          required
          minLength="8"
        />
        <span className="register__error">{errors.password}</span>

        <input
          className="register_form__input"
          type="password"
          name="confirmPassword"
          placeholder="Volver a escribir la contraseña"
          value={values.confirmPassword || ""}
          onChange={handleChange}
          required
        />
        <span className="register__error">
          {values.confirmPassword && values.password !== values.confirmPassword
            ? "Las contraseñas no coinciden"
            : ""}
        </span>

        {apiError && (
          <span className="register__error register__error_api">
            {apiError}
          </span>
        )}

        <div className="form__actions">
          <button
            className={`register_form__button ${!isFormCompletelyValid ? "register_form__button_disabled" : ""}`}
            type="submit"
            disabled={!isFormCompletelyValid}
          >
            Regístrate
          </button>

          <div className="register__signup">
            <Link className="register__signup_link" to="/signin">
              o Iniciar sesión
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
