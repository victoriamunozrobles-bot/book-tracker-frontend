import { useEffect, useContext } from "react";
import { useFormAndValidation } from "../../utils/useFormAndValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./editProfile.css";

export default function EditProfile({ isOpen, onClose, onUpdateProfile }) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onUpdateProfile({
      name: values.name,
      avatar: values.avatar,
    });
  };

  return (
    <div className={`edit-popup ${isOpen ? "edit-popup_opened" : ""}`}>
      <div className="edit-popup__container">
        <button
          type="button"
          className="edit-popup__close-button"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="edit-popup__title">EDITAR PERFIL</h2>

        <form className="edit-popup__form" onSubmit={handleSubmit} noValidate>
          {/* CAMPO DE NOMBRE */}
          <input
            className="edit-popup__input"
            type="text"
            name="name"
            placeholder="Tu nombre (ej. Victoria)"
            value={values.name || ""}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="40"
          />
          <span className="edit-popup__error">{errors.name}</span>

          <input
            className="edit-popup__input"
            type="url"
            name="avatar"
            placeholder="URL de tu foto de perfil"
            value={values.avatar || ""}
            onChange={handleChange}
            required
          />
          <span className="edit-popup__error">{errors.avatar}</span>

          <button
            className={`edit-popup__button ${!isValid ? "edit-popup__button_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            GUARDAR CAMBIOS
          </button>
        </form>
      </div>
    </div>
  );
}
