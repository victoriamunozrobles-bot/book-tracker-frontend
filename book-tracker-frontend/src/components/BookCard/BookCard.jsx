import exampleImg from "../../images/example.webp";

export default function BookCard({ bookCard, onCardClose }) {
  function handleCloseClick() {
    onCardClose(bookCard);
  }
  return (
    <li className="book-card">
      <img className="book-card__image" src={exampleImg} />
      <button
        aria-label="Cerrar modal"
        className="book-card__close-button"
        type="button"
        onClick={handleCloseClick}
      ></button>
      <ul className="book-card__description">
        <span className="book-card__chip book-card__chip--state">Leyendo</span>
        <li className="book-card__title">
          El señor de los anillos: La comunidad del anillo
        </li>
        <li className="book-card__author">J.R.R. Tolkien</li>
        <li className="book-card__synopsis">
          El mago Gandalf descubre que el anillo heredado por Frodo de su tío
          Bilbo es el Anillo Único creado por Sauron. Para evitar que el mal se
          apodere del mundo, se forma una comunidad de nueve miembros
          —incluyendo humanos, elfos, enanos y hobbits— que parte hacia Mordor.
          Sin embargo, la corrupción del anillo y los ataques de los orcos
          terminan separando al grupo.
        </li>
        <li className="book-card__chip">
          <li className="book-card__chip book-card__chip--pages">576</li>
          <li className="book-card__chip book-card__chip--genre">Fantasía</li>
        </li>
      </ul>
    </li>
  );
}
