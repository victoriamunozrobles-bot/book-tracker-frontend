import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onRegister(email, password);
  };

  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form className={"register__form"} onSubmit={handleSubmit}>
        <input
          className="register_form__input"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={handleChangeName}
          required
        />
        <input
          className="register_form__input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          className="register_form__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <input
          className="register_form__input"
          type="password"
          placeholder="Volver a escribir la contraseña"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <button className="register_form__button" type="submit">
          Regístrate
        </button>
      </form>
      <div className="register__signup">
        <Link className="register__signup_link" to="/signin">
          o Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
