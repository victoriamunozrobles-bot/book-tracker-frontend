import { useState } from "react";
import BookCard from "../BookCard/BookCard.jsx";
import NoteModal from "../NoteModal/NoteModal.jsx";
import "./library.css";

export default function Library({ savedBooks, setSavedBooks, onDeleteBook }) {
  const [selectedBookForNotes, setSelectedBookForNotes] = useState(null);
  const [selectedBookForDetails, setSelectedBookForDetails] = useState(null);

  const getId = (book) => book._id || book.id;

  const handleRemoveBook = (bookToRemove) => {
    onDeleteBook(getId(bookToRemove));
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
      if (getId(book) === getId(bookToUpdate)) {
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

  const handleDeleteNote = (bookToUpdate, noteIndex) => {
    const updatedBooks = savedBooks.map((book) => {
      if (getId(book) === getId(bookToUpdate)) {
        const newNotes = book.notes.filter((_, i) => i !== noteIndex);
        return { ...book, notes: newNotes };
      }
      return book;
    });
    setSavedBooks(updatedBooks);
  };

  const handleEditNote = (bookToUpdate, noteIndex, editedText) => {
    if (!editedText.trim()) return;

    const updatedBooks = savedBooks.map((book) => {
      if (getId(book) === getId(bookToUpdate)) {
        const newNotes = [...book.notes];
        newNotes[noteIndex] = editedText;
        return { ...book, notes: newNotes };
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
            const title =
              book.volumeInfo?.title || book.title || "Título desconocido";
            const coverImage =
              book.volumeInfo?.imageLinks?.thumbnail || book.coverImage;

            return (
              <article
                key={getId(book)}
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
          <BookCard
            book={
              savedBooks.find(
                (b) => getId(b) === getId(selectedBookForDetails),
              ) || selectedBookForDetails
            }
            inLibrary={true}
            onCardClose={() => setSelectedBookForDetails(null)}
            onRemoveBook={handleRemoveBook}
            onNotesClick={handleOpenNotes}
            onDeleteNote={handleDeleteNote}
            onEditNote={handleEditNote}
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
