import { useState } from "react";
import BookCard from "../BookCard/BookCard.jsx";
import "./BookGallery.css";

export default function BookGallery({
  searchResults,
  onSaveBook,
  isLoading,
  hasSearched,
}) {
  const [selectedBook, setSelectedBook] = useState(null);

  if (isLoading) {
    return (
      <div className="book-gallery__message-container">
        <div className="book-gallery__spinner"></div>
        <p className="book-gallery__message gallery__message--pulsing">
          Buscando el libro en los registros...
        </p>
      </div>
    );
  }

  if (!isLoading && hasSearched && searchResults.length === 0) {
    return (
      <div className="book-gallery__message-container">
        <p className="book-gallery__message gallery__message--pulsing">
          El libro que buscas no se ha encontrado.
        </p>
      </div>
    );
  }
  return (
    <>
      <ul className="book-gallery__list">
        {searchResults.map((book) => {
          const coverImage =
            book.volumeInfo?.imageLinks?.thumbnail ||
            "https://via.placeholder.com/150x200?text=Sin+Portada";
          const title = book.volumeInfo?.title || "Sin título";

          return (
            <li
              key={book.id}
              className="book-gallery__item"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={coverImage}
                alt={title}
                className="book-gallery__image"
              />
              <p className="book-gallery__title">{title}</p>
            </li>
          );
        })}
      </ul>

      {selectedBook !== null && (
        <div className="book-modal" onClick={() => setSelectedBook(null)}>
          <BookCard
            book={selectedBook}
            onCardClose={() => setSelectedBook(null)}
            onSaveBook={onSaveBook}
          />
        </div>
      )}
    </>
  );
}
