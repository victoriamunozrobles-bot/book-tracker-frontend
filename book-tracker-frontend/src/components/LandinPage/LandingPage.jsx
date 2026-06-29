import "./LandingPage.css";

export default function LandingPage({ onRegisterClick }) {
  return (
    <div className="landing">
      <h2 className="landing__title">Bienvenido a tu Biblioteca Digital 📖</h2>
      <p className="landing__subtitle">
        Busca, guarda y organiza todos tus libros favoritos en un solo lugar.
        Únete a nuestra comunidad hoy mismo.
      </p>
      <button className="landing__cta-button" onClick={onRegisterClick}>
        🚀 Empieza a rastrear tus libros
      </button>
    </div>
  );
}
