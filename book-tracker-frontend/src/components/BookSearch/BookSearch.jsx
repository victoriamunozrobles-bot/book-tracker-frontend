import searchIcon from "../../images/search-icon.svg";

export default function BookSearch() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="book-search__search-bar">
      <form
        className="book-search__form"
        name="book-search-form"
        id="book-search-form"
        onSubmit={handleSubmit}
      >
        <input
          className="book-search__input"
          name="search"
          placeholder="Título o autor"
          type="text"
          minLength="2"
          maxLength="40"
        />
        <button className="book-search__button" type="submit">
          <img src={searchIcon} alt="Ícono de búsqueda" />
        </button>
      </form>
    </div>
  );
}
