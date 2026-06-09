import exampleImg from "../../images/example.webp";
import add from "../../images/add-icon.svg";

export default function BookCard({ book, onCardClose }) {
  const info = book.volumeInfo;

  const title = info.title || "Título desconocido";
  const author = info.authors ? info.authors[0] : "Autor desconocido";
  const synopsis = info.description || "Sin sinopsis disponible.";
  const pages = info.pageCount || "N/A";
  const genre = info.categories ? info.categories[0] : "General";
  const coverImage = info.imageLinks?.thumbnail || exampleImg;

  return (
    <article className="book-card" onClick={(e) => e.stopPropagation()}>
      <img className="book-card__image" src={coverImage} alt={title} />
      <button
        aria-label="Cerrar modal"
        className="book-card__close-button"
        type="button"
        onClick={() => onCardClose(book)}
      >
        X
      </button>
      <div className="book-card__content">
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

        <button className="book-card__add-button">
          <img
            className="book-card__add-icon"
            src={add}
            alt="Botón para agregar a biblioteca."
          />
        </button>
      </div>
    </article>
  );
}
