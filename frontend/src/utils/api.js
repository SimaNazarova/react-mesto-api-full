class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Статус ответа
  _statusJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Загрузка информацию о пользователе
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: this._headers,
      },
    }).then(this._statusJson);
  }

  //Загрузка карточек
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: this._headers,
      },
    }).then(this._statusJson);
  }

  //Редактирование информации о пользователе
  editUserInfo(userInfo) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._headers,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then(this._statusJson);
  }

  //Добавление новой карточки
  addNewCard(cardInfo) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this._headers,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link,
      }),
    }).then(this._statusJson);
  }

  //Отображение количества лайков
  putLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: {
        authorization: this._headers,
      },
    }).then(this._statusJson);
  }

  //Удаление лайка
  deleteLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._headers,
      },
    }).then(this._statusJson);
  }

  //Удаление карточки
  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._headers,
      },
    }).then(this._statusJson);
  }

  //Обновление аватара пользователя
  updateUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._headers,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._statusJson);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: "7425052a-c456-4fc7-a0e3-c6a41d33ee63",
});

export default api;
