import { useState } from "react";
import BookCard from "../BookCard/BookCard.jsx";
import "./BookGallery.css";

export default function BookGallery({ searchResults }) {
  const [selectedBook, setSelectedBook] = useState(null);

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
          />
        </div>
      )}
    </>
  );
}
