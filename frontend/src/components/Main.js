import React from "react";
import imgAvatar from "../images/avatar.png";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCard,
  onCardLike,
  onCardDelete,
}) {
  // Подписка на глобальный контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar">
            <img
              src={currentUser != null ? currentUser.avatar : imgAvatar}
              alt="Аватар пользователя"
              className="profile__image"
            />
            <button
              aria-label="Редактировать фото"
              type="button"
              className="profile__update-button"
              onClick={onEditAvatar}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__name">
              {currentUser != null ? currentUser.name : "Загрузка..."}
            </h1>
            <p className="profile__description">
              {currentUser != null ? currentUser.about : "Загрузка..."}
            </p>
            <button
              aria-label="Редактировать профиль"
              type="button"
              className="profile__edit-button link-opacity"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          aria-label="Добавть"
          type="button"
          className="profile__add-button link-opacity"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__items">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCard={onCard}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
