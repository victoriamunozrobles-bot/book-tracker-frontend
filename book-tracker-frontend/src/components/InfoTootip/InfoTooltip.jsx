import { Link } from "react-router-dom";
import "./infoTooltip.css";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`tooltip ${isOpen ? "tooltip_opened" : ""}`}>
      <div className="tooltip__container">
        <button
          type="button"
          className="tooltip__close-button"
          onClick={onClose}
        >
          X
        </button>

        <div
          className={`tooltip__icon ${isSuccess ? "tooltip__icon_type_success" : "tooltip__icon_type_error"}`}
        ></div>

        <h2 className="tooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>

        {isSuccess && (
          <Link to="/signin" className="tooltip__link" onClick={onClose}>
            Iniciar sesión
          </Link>
        )}
      </div>
    </div>
  );
}
