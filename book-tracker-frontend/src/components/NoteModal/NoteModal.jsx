import { useState } from "react";
import "./noteModal.css";

export default function NoteModal({ book, onClose, onSaveNote }) {
  const [noteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveNote(book, noteText);
    setNoteText("");
    onClose();
  };

  if (!book) return null;

  return (
    <div className="notes-modal-overlay" onClick={onClose}>
      <div className="notes-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="notes-modal__close-btn"
          type="button"
          onClick={onClose}
        >
          X
        </button>

        <h2>Notas para: {book.volumeInfo?.title}</h2>

        <form onSubmit={handleSubmit} className="notes-modal__form">
          <textarea
            className="notes-modal__textarea"
            placeholder="Escribe tus pensamientos, citas favoritas o progreso aquí..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            autoFocus
          />
          <div className="notes-modal__actions">
            <button
              type="button"
              className="notes-modal__cancel-btn"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="notes-modal__save-btn">
              Guardar Nota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
