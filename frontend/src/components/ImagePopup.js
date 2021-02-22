function ImagePopup(props) {
  return (
    <section className={`popup popup_photo ${props.isOpen && "popup_opened"}`}>
      <div className="popup__photo-container">
        <button className="popup__close" onClick={props.onClose}></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__image-name">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
