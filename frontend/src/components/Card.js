import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={props.card.link}
        onClick={handleCardClick}
        alt={props.card.name}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__image-name">
        <h2 className="element__name">{props.card.name} </h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
