import vector from "../images/Vector.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import React from "react";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__upload-button" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            alt="аватар"
            src={currentUser.avatar}
          />
          <img
            className="profile__upload-image"
            src={vector}
            alt="Редактировать"
          />
        </button>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name"> {currentUser.name}</h1>
            <button
              className="profile__edit-button"
              aria-label="редактировать"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__name-about"> {currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__table">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
