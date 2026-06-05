import "../../index.css";
import Header from "../Header/Header.jsx";
import Login from "../Login/Login.jsx";

function App() {
  return (
    <div className="page">
      <Header />
      <main className="page__main-content">
        <Login />
      </main>
    </div>
  );
}

export default App;
