import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function SideBar({ loggedIn, userEmail }) {
  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar__logo-link">
        <img src={logo} alt="Logo" className="sidebar__logo" />
      </Link>

      {loggedIn && (
        <>
          <nav className="sidebar__nav">
            <h2>Hola, </h2>
            <Link to="/" className="sidebar__link">
              📚 Mi Biblioteca
            </Link>
            <Link to="/search" className="sidebar__link">
              🔍 Buscar Libros
            </Link>
          </nav>

          <div className="sidebar__footer">
            <span className="sidebar__email">{userEmail}</span>
            {/* Aquí es el lugar perfecto para poner un botón de "Cerrar Sesión" en el futuro */}
          </div>
        </>
      )}
    </aside>
  );
}
