import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation__nav">
      <Link to="/" className="navigation__link">
        Mi Biblioteca
      </Link>
      <Link to="/search" className="navigation__link">
        Buscar Libros
      </Link>
      <Link to="/profile" className="navigation__link">
        Mi perfil
      </Link>
    </nav>
  );
}
