import { useState, useEffect } from "react";
import "./editName.css";

export default function EditName({ isOpen, onClose, onUpdateName }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateName(name);
  };

  if (!isOpen) return null;

  return (
    <div className="name-modal" onClick={onClose}>
      <div className="name-modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="name-modal__close-button"
          onClick={onClose}
          type="button"
        >
          X
        </button>

        <h2 className="name-modal__title">Cambiar tu nombre de usuario</h2>

        <form className="name-modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-modal__input"
            placeholder="Ingresa tu nuevo nombre de usuario"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="name-modal__save-button">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
