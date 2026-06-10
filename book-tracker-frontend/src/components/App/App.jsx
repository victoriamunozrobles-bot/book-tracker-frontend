import { useState, useEffect } from "react";
import * as auth from "../../utils/auth.js";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "../../index.css";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import BookSearch from "../BookSearch/BookSearch.jsx";
import { searchBooks } from "../../utils/googleBooks.js";
import Navigation from "../Navigation/Navigation.jsx";
import BookGallery from "../BookGallery/BookGallery.jsx";
import Library from "../Library/Library.jsx";
import EditAvatar from "../form/EditAvatar/EditAvatar.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [savedBooks, setSavedBooks] = useState(() => {
    const localBooks = localStorage.getItem("mySavedBooks");
    return localBooks ? JSON.parse(localBooks) : [];
  });
  const [isCheckingToken, setIsCheckingToken] = useState(
    !!localStorage.getItem("jwt"),
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("mySavedBooks", JSON.stringify(savedBooks));
  }, [savedBooks]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
  };

  const handleUpdateAvatar = (newAvatarUrl) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatarUrl,
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
    searchBooks(query)
      .then((results) => {
        setSearchResults(results);
      })

      .catch((err) => {
        console.error(err);

        setSearchResults([]);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      api

        .getUserInfo()

        .then((userData) => setCurrentUser(userData))

        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  if (isCheckingToken) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Navigation
          classname="page__sideBar"
          loggedIn={loggedIn}
          userEmail={userEmail}
          userName={currentUser.name || "Lector"}
          userAvatar={currentUser.avatar}
          onEditAvatarClick={handleEditAvatarClick}
        />

        <main className="page__main-content">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Library savedBooks={savedBooks} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
