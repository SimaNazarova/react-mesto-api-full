function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>

        <div className="popup__content">
          <h2 className="popup__title">{props.title}</h2>

          <form
            className="popup__form"
            name={props.formName}
            onSubmit={props.onSubmit}
            noValidate
          >
            {props.children}
            <button
              className="popup__save-button"
              type="submit"
              aria-label="сохранить"
              onClick={props.onClose}
            >
              {props.loadingButton}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
