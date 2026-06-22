import { useState } from "react";
import "./EditAvatar.css";

export default function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleClose = () => {
    setAvatarUrl("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarUrl,
    });
    setAvatarUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="avatar-modal" onClick={handleClose}>
      <div
        className="avatar-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="avatar-modal__close-button"
          onClick={handleClose}
          type="button"
        >
          X
        </button>

        <h2 className="avatar-modal__title">Cambiar Avatar</h2>

        <form className="avatar-modal__form" onSubmit={handleSubmit}>
          <input
            type="url"
            className="avatar-modal__input"
            placeholder="Enlace a la nueva imagen"
            required
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <button type="submit" className="avatar-modal__save-button">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
