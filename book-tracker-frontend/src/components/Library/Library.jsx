import { useState } from "react";
import BookCard from "../BookCard/BookCard.jsx";
import NoteModal from "../NoteModal/NoteModal.jsx";

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

  const handleSaveNote = (bookToUpdate, newNoteText) => {
    if (!newNoteText.trim()) return;

    const updatedBooks = savedBooks.map((book) => {
      if (book.id === bookToUpdate.id) {
        const currentNotes = book.notes || [];

        return {
          ...book,
          notes: [...currentNotes, newNoteText],
        };
      }
      return book;
    });

    setSavedBooks(updatedBooks);
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
        <NoteModal
          book={selectedBookForNotes}
          onClose={handleCloseNotes}
          onSaveNote={handleSaveNote}
        />
      )}
    </section>
  );
}
