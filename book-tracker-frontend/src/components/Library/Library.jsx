import { useState } from "react";
import BookCard from "../BookCard/BookCard.jsx";

export default function Library({ savedBooks, setSavedBooks }) {
  const [selectedBookForNotes, setSelectedBookForNotes] = useState(null);
  const [selectedBookForDetails, setSelectedBookForDetails] = useState(null);

  const handleRemoveBook = (bookToRemove) => {
    const updatedBooks = savedBooks.filter(
      (book) => book.id !== bookToRemove.id,
    );
    setSavedBooks(updatedBooks);
    setSelectedBookForDetails(null);
  };

  const handleOpenNotes = (bookToNote) => {
    setSelectedBookForNotes(bookToNote);
  };

  const handleCloseNotes = () => {
    setSelectedBookForNotes(null);
  };

  return (
    <section className="library">
      <header className="library__header">
        <h1 className="library__title">Mi Biblioteca</h1>
        <p className="library__subtitle">
          Tus lecturas guardadas y tu progreso.
        </p>
      </header>

      {savedBooks.length > 0 ? (
        <div className="book-gallery__list">
          {savedBooks.map((book) => {
            const info = book.volumeInfo;
            const title = info?.title || "Título desconocido";
            const coverImage = info?.imageLinks?.thumbnail;

            return (
              <article
                key={book.id}
                className="book-gallery__item"
                onClick={() => setSelectedBookForDetails(book)}
              >
                <img
                  className="book-gallery__image"
                  src={coverImage}
                  alt={title}
                />
                <h3 className="book-gallery__title">{title}</h3>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="library__empty-state">
          <p>Aún no tienes libros en tu biblioteca.</p>
          <p>¡Ve a "Buscar Libros" para empezar a agregar tus favoritos!</p>
        </div>
      )}

      {selectedBookForDetails && (
        <div className="book-modal">
          {" "}
          <BookCard
            book={selectedBookForDetails}
            inLibrary={true}
            onCardClose={() => setSelectedBookForDetails(null)}
            onRemoveBook={handleRemoveBook}
            onNotesClick={handleOpenNotes}
          />
        </div>
      )}

      {selectedBookForNotes && (
        <div className="notes-modal-overlay">
          <div className="notes-modal-content">
            <h2>Notas para: {selectedBookForNotes.volumeInfo?.title}</h2>
            <textarea placeholder="Escribe tus notas aquí..."></textarea>
            <button onClick={handleCloseNotes}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
}
