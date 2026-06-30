export default function Footer({ userEmail }) {
  return (
    <footer className="footer">
      <span className="footer__email">{userEmail}</span>
      <p className="footer__credits">
        © 2026 | Desarrollado por Victoria Muñoz Robles
      </p>
    </footer>
  );
}
