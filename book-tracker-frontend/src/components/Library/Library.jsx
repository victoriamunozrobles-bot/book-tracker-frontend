import BookGallery from "../BookGallery/BookGallery.jsx";
import "./library.css";

export default function Library({ savedBooks }) {
  return (
    <section className="library">
      <header className="library__header">
        <h1 className="library__title">Mi Biblioteca</h1>
        <p className="library__subtitle">
          Tus lecturas guardadas y tu progreso.
        </p>
      </header>

      {savedBooks.length > 0 ? (
        <BookGallery searchResults={savedBooks} />
      ) : (
        <div className="library__empty-state">
          <p>Aún no tienes libros en tu biblioteca.</p>
          <p>¡Ve a "Buscar Libros" para empezar a agregar tus favoritos!</p>
        </div>
      )}
    </section>
  );
}
