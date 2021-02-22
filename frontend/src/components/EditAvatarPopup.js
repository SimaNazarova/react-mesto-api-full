import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="upload-avatar"
      title="Обновить аватар"
      formName="add-photo-form"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      loadingButton={props.loadingButton}
    >
      <input
        className="popup__form-item popup__form-link"
        id="avatar-link-input"
        type="url"
        name="link"
        placeholder="Ссылка на фотографию"
        maxLength="200"
        required
        ref={avatarRef}
      />
      <span className="popup__error" id="avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
