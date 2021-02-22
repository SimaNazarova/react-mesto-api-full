function InfoTooltip(props) {
  return (
    <section className={`popup popup__auth ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>

        <div className="popup__content">
          <img
            className="popup__content-auth-logo"
            src={props.logo}
            alt="логотип"
          />
          <p className="popup__content-auth-text">{props.text}</p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
