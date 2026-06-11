export default function Footer({ userEmail }) {
  return (
    <div className="footer">
      <span className="footer__email">{userEmail}</span>
    </div>
  );
}
