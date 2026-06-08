import "../../index.css";
import Header from "../Header/Header.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import BookSearch from "../BookSearch/BookSearch.jsx";

function App() {
  return (
    <div className="page">
      <Header />
      <main className="page__main-content">
        <Login />
        <Register />
        <BookSearch />
      </main>
    </div>
  );
}

export default App;
