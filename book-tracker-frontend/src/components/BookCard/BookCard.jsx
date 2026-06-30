import exampleImg from "../../images/example.webp";
import add from "../../images/add-icon.svg";
import { useState } from "react";
import "./bookCard.css";

export default function BookCard({
  book,
  onCardClose,
  onSaveBook,
  onRemoveBook,
  onNotesClick,
  onDeleteNote,
  onEditNote,
  inLibrary = false,
}) {
  const info = book.volumeInfo || {};

  const title = info.title || book.title || "Título desconocido";
  const author =
    (info.authors && info.authors[0]) || book.author || "Autor desconocido";
  const synopsis =
    info.description || book.description || "Sin sinopsis disponible.";
  const pages = info.pageCount || book.pages || "N/A";
  const genre =
    (info.categories && info.categories[0]) || book.genre || "General";
  const coverImage =
    info.imageLinks?.thumbnail || book.coverImage || exampleImg;
  const savedNotes = book.notes || [];

  const readingStatus = book.userMeta?.status || book.status;
  const readingStartDate = book.userMeta?.startDate || book.startDate;
  const readingEndDate = book.userMeta?.endDate || book.endDate;
  const hasTrackingData = readingStatus && readingStartDate;

  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editNoteText, setEditNoteText] = useState("");

  const startEditing = (index, currentText) => {
    setEditingNoteIndex(index);
    setEditNoteText(currentText);
  };

  const cancelEditing = () => {
    setEditingNoteIndex(null);
    setEditNoteText("");
  };

  const saveEdit = (index) => {
    onEditNote(book, index, editNoteText);
    setEditingNoteIndex(null);
  };

  return (
    <article className="book-card" onClick={(e) => e.stopPropagation()}>
      <button
        aria-label="Cerrar modal"
        className="book-card__close-button"
        type="button"
        onClick={() => onCardClose(book)}
      >
        X
      </button>
      <img className="book-card__image" src={coverImage} alt={title} />

      <div className="book-card__content">
        {hasTrackingData && (
          <div className="book-card__meta">
            <span
              className={`book-card__status ${readingStatus === "Leyendo" ? "book-card__status_reading" : "book-card__status_finished"}`}
            >
              {readingStatus === "Leyendo" ? "📖 Leyendo" : "✅ Terminado"}
            </span>

            <div className="book-card__dates">
              <p>
                <strong>Inicio:</strong> {readingStartDate}
              </p>

              {readingStatus === "Terminado" && readingEndDate && (
                <p>
                  <strong>Fin:</strong> {readingEndDate}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="book-card__header">
          <h2 className="book-card__title">{title}</h2>
          <p className="book-card__author">{author}</p>
        </div>
        <div className="book-card__synopsis-container">
          <p className="book-card__synopsis">{synopsis}</p>
        </div>

        <ul className="book-card__tags">
          <li className="book-card__tag">{pages} págs</li>
          <li className="book-card__tag">{genre}</li>
        </ul>

        {inLibrary && savedNotes.length > 0 && (
          <div className="book-card__notes-container">
            <h4 className="book-card__notes-heading">Mis apuntes:</h4>
            <ul className="book-card__notes-history">
              {savedNotes.map((note, index) => (
                <li key={index} className="book-card__note-bubble">
                  {editingNoteIndex === index ? (
                    <div className="book-card__note-edit-mode">
                      <input
                        type="text"
                        value={editNoteText}
                        onChange={(e) => setEditNoteText(e.target.value)}
                        className="book-card__note-edit-input"
                        autoFocus
                      />
                      <div className="book-card__note-edit-actions">
                        <button type="button" onClick={() => saveEdit(index)}>
                          💾
                        </button>
                        <button type="button" onClick={cancelEditing}>
                          ❌
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="book-card__note-read-mode">
                      <span className="book-card__note-text">{note}</span>
                      <div className="book-card__note-actions">
                        <button
                          type="button"
                          className="book-card__icon-btn"
                          onClick={() =>
                            onEditNote && startEditing(index, note)
                          }
                          title="Editar nota"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="book-card__icon-btn"
                          onClick={() =>
                            onDeleteNote && onDeleteNote(book, index)
                          }
                          title="Eliminar nota"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {inLibrary ? (
          <div className="book-card__library-actions">
            <button
              className="book-card__action-btn book-card__action-btn--notes"
              type="button"
              onClick={() => onNotesClick(book)}
            >
              📝 Añadir nota
            </button>
            <button
              className="book-card__action-btn book-card__action-btn--remove"
              type="button"
              onClick={() => onRemoveBook(book)}
            >
              🗑️ Quitar
            </button>
          </div>
        ) : (
          <button
            className="book-card__add-button"
            type="button"
            onClick={() => onSaveBook(book)}
          >
            <img
              className="book-card__add-icon"
              src={add}
              alt="Botón para agregar a biblioteca."
            />
          </button>
        )}
      </div>
    </article>
  );
}
