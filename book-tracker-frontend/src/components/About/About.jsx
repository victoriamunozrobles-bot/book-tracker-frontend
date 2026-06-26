export default function About({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="about-popup__overlay" onClick={onClose}>
      <div
        className="about-popup__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="about-popup__close-btn" onClick={onClose}>
          X
        </button>

        <h2 className="about-popup__title">Acerca de la autora</h2>

        <div className="about-popup__text-container">
          <p>
            ¡Hola! Soy Victoria, Fullstack Developer y profesora de castellano
            desde Temuco, Chile. Me apasiona unir la educación con la lógica de
            la programación para construir interfaces accesibles y funcionales.
          </p>
          <p>
            Cuando no estoy escribiendo código, probablemente me encuentres en
            medio de algún proyecto de tejido a crochet o pasando el rato con mi
            gata, Eva.
          </p>
        </div>
      </div>
    </div>
  );
}
