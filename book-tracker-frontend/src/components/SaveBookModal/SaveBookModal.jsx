import { useState } from "react";
import "./saveBookModal.css";

export default function SaveBookModal({
  isOpen,
  onClose,
  onConfirmSave,
  book,
}) {
  const getToday = () => new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState("");
  const [isReading, setIsReading] = useState(true);

  const resetForm = () => {
    setStartDate(getToday());
    setEndDate("");
    setIsReading(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onConfirmSave({
      book,
      meta: {
        startDate,
        endDate: isReading ? null : endDate,
        status: isReading ? "Leyendo" : "Terminado",
      },
    });

    resetForm();
  };

  return (
    <div className={`save-modal ${isOpen ? "save-modal_opened" : ""}`}>
      <div className="save-modal__container">
        <button
          type="button"
          className="save-modal__close-button"
          onClick={handleClose}
        >
          ❌
        </button>

        <h2 className="save-modal__title">GUARDAR LIBRO</h2>

        {book && (
          <p className="save-modal__book-title">{book.volumeInfo?.title}</p>
        )}

        <form className="save-modal__form" onSubmit={handleSubmit}>
          <label className="save-modal__label">Fecha de inicio:</label>
          <input
            className="save-modal__input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label className="save-modal__checkbox-container">
            <input
              type="checkbox"
              className="save-modal__checkbox"
              checked={isReading}
              onChange={(e) => setIsReading(e.target.checked)}
            />
            📖 Lo estoy leyendo actualmente
          </label>

          {!isReading && (
            <>
              <label className="save-modal__label">Fecha de término:</label>
              <input
                className="save-modal__input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required={!isReading}
              />
            </>
          )}

          <button className="save-modal__button" type="submit">
            💾 GUARDAR EN BIBLIOTECA
          </button>
        </form>
      </div>
    </div>
  );
}
