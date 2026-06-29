import { useState } from "react";
import "./Header.css";

export default function Header({
  loggedIn,
  userName,
  userAvatar,
  onLoginClick,
  onRegisterClick,
  onEditAvatarClick,
  onEditNameClick,
  onAboutClick,
  onSignOut,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header__logo-area">
        <h1 className="header__title">📚 Book Tracker</h1>
      </div>

      <div className="header__actions">
        {loggedIn ? (
          <div className="header__profile">
            <div className="header__user-info" onClick={toggleDropdown}>
              <span className="header__name">{userName}</span>
              <div
                className="header__avatar"
                style={{
                  backgroundImage: `url(${userAvatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"})`,
                }}
              ></div>
              <span className="header__arrow">▼</span>
            </div>

            {isDropdownOpen && (
              <div className="header__dropdown">
                <button
                  className="header__dropdown-item"
                  onClick={() => {
                    onEditNameClick();
                    setIsDropdownOpen(false);
                  }}
                >
                  ✏️ Editar nombre
                </button>
                <button
                  className="header__dropdown-item"
                  onClick={() => {
                    onEditAvatarClick();
                    setIsDropdownOpen(false);
                  }}
                >
                  🖼️ Editar avatar
                </button>
                <button
                  className="header__dropdown-item"
                  onClick={() => {
                    onAboutClick();
                    setIsDropdownOpen(false);
                  }}
                >
                  ℹ️ Acerca de
                </button>
                <div className="header__divider"></div>
                <button
                  className="header__dropdown-item header__dropdown-item_type_logout"
                  onClick={onSignOut}
                >
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              className="header__button header__button_type_text"
              onClick={onLoginClick}
            >
              🔑 Iniciar sesión
            </button>
            <button
              className="header__button header__button_type_solid"
              onClick={onRegisterClick}
            >
              📝 Registrarse
            </button>
          </>
        )}
      </div>
    </header>
  );
}
