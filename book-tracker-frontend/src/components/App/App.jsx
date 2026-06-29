import { useState, useEffect } from "react";
import * as MainApi from "../../utils/MainApi.js";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [savedBooks, setSavedBooks] = useState([]);
  const [isCheckingToken, setIsCheckingToken] = useState(
    !!localStorage.getItem("jwt"),
  );
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isBooksLoaded, setIsBooksLoaded] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const loadUserBooks = (email) => {
    const localBooks = localStorage.getItem(`mySavedBooks_${email}`);
    setSavedBooks(localBooks ? JSON.parse(localBooks) : []);
    setIsBooksLoaded(true);
  };

  useEffect(() => {
    if (loggedIn && userEmail && isBooksLoaded) {
      localStorage.setItem(
        `mySavedBooks_${userEmail}`,
        JSON.stringify(savedBooks),
      );
    }
  }, [savedBooks, userEmail, loggedIn, isBooksLoaded]);

  const closeAllPopups = () => {
    setIsAboutPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsEditProfilePopupOpen(false);
  };

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleUpdateProfile = (data) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      name: data.name,
      avatar: data.avatar,
    }));
    closeAllPopups();
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.checkToken(jwt)
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
    }
  };

  const handleLogin = (email, password) => {
    return MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          loadUserBooks(email);
          closeAllPopups();
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
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
    setUserEmail("");
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
                      onSaveBook={handleSaveBook}
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

        <Login
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          handleLogin={handleLogin}
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
        {isAboutPopupOpen && (
          <About isOpen={isAboutPopupOpen} onClose={closeAllPopups} />
        )}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeTooltipAndRedirect}
          isSuccess={isRegistrationSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
