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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

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
  const [isBooksLoaded, setIsBooksLoaded] = useState(false);

  const loadUserBooks = (email) => {
    console.log("1. LEYENDO de localStorage para:", email);
    const localBooks = localStorage.getItem(`mySavedBooks_${email}`);
    setSavedBooks(localBooks ? JSON.parse(localBooks) : []);
    setIsBooksLoaded(true);
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
    if (loggedIn && userEmail && isBooksLoaded) {
      localStorage.setItem(
        `mySavedBooks_${userEmail}`,
        JSON.stringify(savedBooks),
      );
    }
  }, [savedBooks, userEmail, loggedIn, isBooksLoaded]);

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

  const handleUpdateAvatar = (data) => {
    const avatarString = typeof data === "object" ? data.avatar : data;

    setCurrentUser((prevUser) => ({
      ...prevUser,
      avatar: avatarString,
    }));
    closeAllPopups();
  };

  const handleUpdateName = (data) => {
    const nameString = typeof data === "object" ? data.name : data;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      name: nameString,
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
            loadUserBooks(res.data.email);
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

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("currentUser");

    setLoggedIn(false);
    setCurrentUser({});
    setUserEmail("");

    navigate("/signin");
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
              onSignOut={handleSignOut}
            />

            {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
          </>
        )}

        <main className="page__main-content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Library
                    savedBooks={savedBooks}
                    setSavedBooks={setSavedBooks}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <>
                    <BookSearch onSearch={handleSearch} />
                    <BookGallery
                      searchResults={searchResults}
                      onSaveBook={handleSaveBook}
                      isLoading={isLoading}
                      hasSearched={hasSearched}
                    />
                  </>
                </ProtectedRoute>
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
