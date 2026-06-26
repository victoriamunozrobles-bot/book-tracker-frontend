import Header from "../Header/Header.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer.jsx";
import signOutIcon from "../../images/sign-out-icon.svg";

import "./sideBar.css";

export default function SideBar({
  className = "",
  loggedIn,
  userEmail,
  userName,
  userAvatar,
  onEditAvatarClick,
  onEditNameClick,
  isOpen,
  onCloseMenu,
  onSignOut,
}) {
  return (
    <aside className={`${className} sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <button className="sidebar__close-button" onClick={onCloseMenu}>
        X
      </button>
      <Header
        userName={userName}
        userAvatar={userAvatar}
        onEditAvatarClick={onEditAvatarClick}
        onEditNameClick={onEditNameClick}
      />

      {loggedIn && (
        <>
          <Navigation onCloseMenu={onCloseMenu} />
          <Footer userEmail={userEmail} />
          <button
            className="sidebar__logout-button"
            onClick={() => {
              onSignOut();
              onCloseMenu();
            }}
          >
            <img
              className="sidebar__logout-icon"
              src={signOutIcon}
              alt="Cerrar sesión"
            />
            Cerrar sesión
          </button>
        </>
      )}
    </aside>
  );
}
