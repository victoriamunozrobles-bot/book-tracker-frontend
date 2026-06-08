import { Link, useLocation } from "react-router-dom";

export default function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <h2 className="header__title">Mi auto</h2>
      <div className="header__container">
        {loggedIn ? (
          <>
            <p className="header__user-email">{email}</p>
            <button className="header__logout" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to={location.pathname === "/signin" ? "/signup" : "/signin"}
            className="header__link"
          >
            {location.pathname === "/signin" ? "Regístrate" : "Inicia sesión"}
          </Link>
        )}
      </div>
    </header>
  );
}
