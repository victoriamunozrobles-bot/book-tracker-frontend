import exampleImg from "../../images/example.webp";

export default function BookCard({ book, onCardClose }) {
  const info = book.volumeInfo;

  const title = info.title || "Título desconocido";
  const author = info.authors ? info.authors[0] : "Autor desconocido";
  const synopsis = info.description || "Sin sinopsis disponible.";
  const pages = info.pageCount || "N/A";
  const genre = info.categories ? info.categories[0] : "General";
  const coverImage = info.imageLinks?.thumbnail || exampleImg;

  return (
    <li className="book-card">
      <img className="book-card__cover" src={coverImage} />
      <button
        aria-label="Cerrar modal"
        className="book-card__close-button"
        type="button"
        onClick={() => onCardClose(book)}
      ></button>
      <ul className="book-card__description">
        <span className="book-card__chip book-card__chip--state">Leyendo</span>
        <li className="book-card__title">{title}</li>
        <li className="book-card__author">{author}</li>
        <li className="book-card__synopsis">{synopsis}</li>
        <li className="book-card__chip">
          <li className="book-card__chip book-card__chip--pages">{pages}</li>
          <li className="book-card__chip book-card__chip--genre">{genre}</li>
        </li>
      </ul>
    </li>
  );
}
