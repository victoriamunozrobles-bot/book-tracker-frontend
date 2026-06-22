import { useState, useEffect } from "react";
import * as auth from "../../utils/auth.js";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../../index.css";
import SideBar from "../SideBar/SideBar.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import BookSearch from "../BookSearch/BookSearch.jsx";
import { searchBooks } from "../../utils/ThirdPartyApi.js";
import BookGallery from "../BookGallery/BookGallery.jsx";
import Library from "../Library/Library.jsx";
import EditAvatar from "../form/EditAvatar/EditAvatar.jsx";
import EditName from "../form/EditName/EditName.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [savedBooks, setSavedBooks] = useState([]);
  const [isCheckingToken, setIsCheckingToken] = useState(
    !!localStorage.getItem("jwt"),
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditNamePopupOpen, setIsEditNamePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const loadUserBooks = (email) => {
    const localBooks = localStorage.getItem(`mySavedBooks_${email}`);
    setSavedBooks(localBooks ? JSON.parse(localBooks) : []);
  };

  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(
        `mySavedBooks_${userEmail}`,
        JSON.stringify(savedBooks),
      );
    }
  }, [savedBooks, userEmail]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditNameClick = () => {
    setIsEditNamePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditNamePopupOpen(false);
  };

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleUpdateAvatar = (newAvatarUrl) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatarUrl,
    }));
    closeAllPopups();
  };

  const handleUpdateName = (newName) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      name: newName,
    }));
    closeAllPopups();
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsCheckingToken(false);
        });
    }
  }, []);

  const handleSaveBook = (bookToSave) => {
    const isAlreadySaved = savedBooks.some((book) => book.id === bookToSave.id);

    if (!isAlreadySaved) {
      setSavedBooks([bookToSave, ...savedBooks]);
      console.log("¡Libro guardado con éxito!", bookToSave.volumeInfo.title);
    } else {
      console.log("Este libro ya está en tu biblioteca.");
    }
  };
  const handleLogin = (email, password) => {
    auth

      .authorize(email, password)

      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          loadUserBooks(userEmail);

          navigate("/");
        }
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (name, email, password) => {
    auth

      .register(name, email, password)

      .then(() => {
        navigate("/signin");
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    setHasSearched(true);

    searchBooks(query)
      .then((results) => {
        setSearchResults(results);
      })

      .catch((err) => {
        console.error(err);
        setSearchResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          const savedUser = localStorage.getItem("currentUser");
          const localUserData = savedUser ? JSON.parse(savedUser) : {};
          setCurrentUser({
            ...userData,
            avatar: localUserData.avatar || userData.avatar || "",
            name: localUserData.name || userData.name || "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  if (isCheckingToken) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`page ${isAuthRoute ? "page--auth" : ""}`}>
        {!isAuthRoute && (
          <>
            <div className="page-mobile__top-bar">
              <button
                className="page-mobile__hamburger"
                onClick={toggleMenu}
                aria-label="Abrir menú"
              >
                ☰
              </button>
            </div>

            <SideBar
              className="page__sidebar"
              loggedIn={loggedIn}
              userEmail={userEmail}
              userName={currentUser.name || "Lector"}
              userAvatar={currentUser.avatar}
              onEditAvatarClick={handleEditAvatarClick}
              onEditNameClick={handleEditNameClick}
              isOpen={isMenuOpen}
              onCloseMenu={closeMenu}
            />

            {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
          </>
        )}

        <main className="page__main-content">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Library
                    savedBooks={savedBooks}
                    setSavedBooks={setSavedBooks}
                  />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/search"
              element={
                loggedIn ? (
                  <>
                    <BookSearch onSearch={handleSearch} />
                    <BookGallery
                      searchResults={searchResults}
                      onSaveBook={handleSaveBook}
                      isLoading={isLoading}
                      hasSearched={hasSearched}
                    />
                  </>
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />

            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register handleRegister={handleRegister} />
                )
              }
            />

            <Route
              path="*"
              element={<Navigate to={loggedIn ? "/" : "/signin"} replace />}
            />
          </Routes>
        </main>

        {isEditAvatarPopupOpen && (
          <EditAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}

        {isEditNamePopupOpen && (
          <EditName
            isOpen={isEditNamePopupOpen}
            onClose={closeAllPopups}
            onUpdateName={handleUpdateName}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
