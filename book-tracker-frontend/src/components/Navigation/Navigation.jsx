import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Navigation({
  loggedIn,
  userEmail,
  userName,
  onEditAvatarClick,
  onEditNameClick,
  userAvatar,
}) {
  const defaultAvatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userName}`;
  const finalAvatarUrl = userAvatar ? userAvatar : defaultAvatar;

  return (
    <aside className="navigation">
      <Link to="/" className="navigation__logo-link">
        <img src={logo} alt="Logo" className="navigation__logo" />
      </Link>
      <div className="navigation__profile">
        <img
          src={finalAvatarUrl}
          alt={`Avatar de ${userName}`}
          className="navigation__avatar"
          onClick={onEditAvatarClick}
        />
        <h2 className="navigation__greeting" onClick={onEditNameClick}>
          Hola, {userName}
        </h2>
      </div>

      {loggedIn && (
        <>
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

          <div className="navigation__footer">
            <span className="navigation__email">{userEmail}</span>
          </div>
        </>
      )}
    </aside>
  );
}
