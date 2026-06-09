import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function SideBar({
  loggedIn,
  userEmail,
  userName = "Usuario",
  onEditAvatarClick,
  userAvatar,
}) {
  const defaultAvatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userName}`;
  const finalAvatarUrl = userAvatar ? userAvatar : defaultAvatar;

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar__logo-link">
        <img src={logo} alt="Logo" className="sidebar__logo" />
      </Link>
      <div className="sidebar__profile">
        <img
          src={finalAvatarUrl}
          alt={`Avatar de ${userName}`}
          className="sidebar__avatar"
          onClick={onEditAvatarClick}
        />
        <h2 className="sidebar__greeting">Hola, {userName}</h2>
      </div>

      {loggedIn && (
        <>
          <nav className="sidebar__nav">
            <Link to="/" className="sidebar__link">
              Mi Biblioteca
            </Link>
            <Link to="/search" className="sidebar__link">
              Buscar Libros
            </Link>
          </nav>

          <div className="sidebar__footer">
            <span className="sidebar__email">{userEmail}</span>
          </div>
        </>
      )}
    </aside>
  );
}
