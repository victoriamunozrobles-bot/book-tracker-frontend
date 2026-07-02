import { useState, useEffect } from "react";
import * as MainApi from "../../utils/MainApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import BookSearch from "../BookSearch/BookSearch.jsx";
import { searchBooks } from "../../utils/ThirdPartyApi.js";
import BookGallery from "../BookGallery/BookGallery.jsx";
import Library from "../Library/Library.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import About from "../About/About.jsx";
import InfoTooltip from "../InfoTootip/InfoTooltip.jsx";
import LandingPage from "../LandingPage/LandingPage.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";
import SaveBookModal from "../SaveBookModal/SaveBookModal.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [isCheckingToken, setIsCheckingToken] = useState(
    !!localStorage.getItem("jwt"),
  );
  const [savedBooks, setSavedBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSaveBookModalOpen, setIsSaveBookModalOpen] = useState(false);
  const [selectedBookToSave, setSelectedBookToSave] = useState(null);
  const [apiError, setApiError] = useState("");

  const closeAllPopups = () => {
    setIsAboutPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsSaveBookModalOpen(false);
    setSelectedBookToSave(null);
    setApiError("");
  };

  useEffect(() => {
    if (location.state?.requireLogin) {
      setTimeout(() => {
        setIsLoginPopupOpen(true);
      }, 0);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleUpdateProfile = (data) => {
    MainApi.updateUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error("Error al actualizar el perfil:", err);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsCheckingToken(false);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser({
            ...userData,
            avatar: userData.avatar || "",
            name: userData.name || "",
          });
        })
        .catch((err) => console.error("Error al obtener usuario:", err));

      MainApi.getSavedBooks()
        .then((booksFromServer) => {
          setSavedBooks(booksFromServer.reverse());
        })
        .catch((err) => console.error("Error al cargar la biblioteca:", err));
    }
  }, [loggedIn]);

  const handleSaveBookClick = (book) => {
    const isAlreadySaved = savedBooks.some(
      (b) => b.bookId === book.id || b.id === book.id,
    );

    if (!isAlreadySaved) {
      setSelectedBookToSave(book);
      setIsSaveBookModalOpen(true);
    }
  };

  const confirmSaveBook = ({ book, meta }) => {
    const bookDataToSave = {
      googleBookId: book.id,
      title: book.volumeInfo?.title || "Sin título",
      author: book.volumeInfo?.authors
        ? book.volumeInfo.authors.join(", ")
        : "Autor desconocido",
      coverImage:
        book.volumeInfo?.imageLinks?.thumbnail ||
        "https://placehold.co/150x200?text=Sin+Portada",
      startDate: meta.startDate,
      endDate: meta.endDate || null,
      status: meta.status,
    };

    MainApi.saveBook(bookDataToSave)
      .then((savedBookFromServer) => {
        setSavedBooks([savedBookFromServer, ...savedBooks]);
        closeAllPopups();
      })
      .catch((err) => console.error("Error al guardar libro:", err));
  };

  const handleDeleteBook = (bookId) => {
    MainApi.deleteBook(bookId)
      .then(() => {
        setSavedBooks((prevBooks) => prevBooks.filter((b) => b._id !== bookId));
      })
      .catch((err) => console.error("Error al eliminar el libro:", err));
  };

  const handleLogin = (email, password) => {
    setApiError("");
    return MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          closeAllPopups();
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setApiError(err.message || "Correo o contraseña incorrectos.");
      });
  };

  const closeTooltipAndRedirect = () => {
    setIsInfoTooltipOpen(false);
    if (isRegistrationSuccess) {
      setIsRegistrationSuccess(false);
      setIsLoginPopupOpen(true);
    }
  };

  const handleRegister = (name, email, password) => {
    setIsRegistrationSuccess(false);
    return MainApi.register(name, email, password)
      .then(() => {
        setIsRegistrationSuccess(true);
        closeAllPopups();
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.error("Error en el registro", err);
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("currentUser");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedBooks([]);
    navigate("/");
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    setHasSearched(true);
    searchBooks(query)
      .then((results) => setSearchResults(results))
      .catch((err) => {
        console.error(err);
        setSearchResults([]);
      })
      .finally(() => setIsLoading(false));
  };

  if (isCheckingToken) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <main className="page__main-content">
          <Header
            loggedIn={loggedIn}
            userName={currentUser.name || "Lector"}
            userAvatar={currentUser.avatar}
            onLoginClick={() => setIsLoginPopupOpen(true)}
            onRegisterClick={() => setIsRegisterPopupOpen(true)}
            onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
            onAboutClick={() => setIsAboutPopupOpen(true)}
            onSignOut={handleSignOut}
          />

          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Library
                    savedBooks={savedBooks}
                    setSavedBooks={setSavedBooks}
                    onDeleteBook={handleDeleteBook}
                  />
                ) : (
                  <LandingPage
                    onRegisterClick={() => setIsRegisterPopupOpen(true)}
                  />
                )
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
                      onSaveBook={handleSaveBookClick}
                      isLoading={isLoading}
                      hasSearched={hasSearched}
                    />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer userEmail={currentUser.email || ""} />

        <Login
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          handleLogin={handleLogin}
          apiError={apiError}
          onSwitchToRegister={() => {
            setIsLoginPopupOpen(false);
            setIsRegisterPopupOpen(true);
          }}
        />
        <Register
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          handleRegister={handleRegister}
          onSwitchToLogin={() => {
            setIsRegisterPopupOpen(false);
            setIsLoginPopupOpen(true);
          }}
        />

        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateProfile}
        />

        {isAboutPopupOpen && (
          <About isOpen={isAboutPopupOpen} onClose={closeAllPopups} />
        )}

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeTooltipAndRedirect}
          isSuccess={isRegistrationSuccess}
        />
        <SaveBookModal
          isOpen={isSaveBookModalOpen}
          onClose={closeAllPopups}
          onConfirmSave={confirmSaveBook}
          book={selectedBookToSave}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
