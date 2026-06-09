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
import SideBar from "../SideBar/SideBar.jsx";
import BookGallery from "../BookGallery/BookGallery.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth

        .checkToken(jwt)

        .then((res) => {
          if (res) {
            setLoggedIn(true);

            setUserEmail(res.data.email);

            navigate("/");
          }
        })

        .catch((err) => console.error(err));
    }
  }, [navigate]);

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

      .register(email, password)

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <SideBar
          classname="page__sideBar"
          loggedIn={loggedIn}
          userEmail={userEmail}
        />

        <main className="page__main-content">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <>
                    <BookSearch onSearch={handleSearch} />
                    <BookGallery searchResults={searchResults} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
