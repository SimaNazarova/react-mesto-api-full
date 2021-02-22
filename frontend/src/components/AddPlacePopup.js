import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      loadingButton={props.loadingButton}
      formName="add-card-form"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-item popup__form-card-name"
        id="name-card-input"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="name-card-input-error"></span>
      <input
        className="popup__form-item popup__form-link"
        id="link-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        maxLength="100"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error" id="link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
