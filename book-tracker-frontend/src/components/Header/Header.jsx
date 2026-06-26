import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import signOutIcon from "../../images/sign-out-icon.svg";

export default function Navigation({
  loggedIn,
  onSignOut,
  userName,
  onEditAvatarClick,
  onEditNameClick,
  userAvatar,
}) {
  const defaultAvatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userName}`;
  const finalAvatarUrl = userAvatar ? userAvatar : defaultAvatar;

  return (
    <aside className="header">
      <div className="header__top-row">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <div className="header__auth-zone">
          {loggedIn ? (
            <button
              className="header__logout-icon-btn"
              onClick={onSignOut}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <img
                className="header__logout-icon-btn"
                src={signOutIcon}
                alt="Cerrar sesión"
              />
            </button>
          ) : (
            <Link to="/signin" className="header__login-btn">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
      <div className="header__profile">
        <img
          src={finalAvatarUrl}
          alt={`Avatar de ${userName}`}
          className="header__avatar"
          onClick={onEditAvatarClick}
        />
        <h2 className="header__greeting" onClick={onEditNameClick}>
          Hola, {userName}
        </h2>
      </div>
    </aside>
  );
}
