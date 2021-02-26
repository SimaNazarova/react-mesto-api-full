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
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._statusJson);
  }

  //Загрузка карточек
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._statusJson);
  }

  //Редактирование информации о пользователе
  editUserInfo(userInfo) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link,
      }),
    }).then(this._statusJson);
  }

  //Отображение количества лайков
  putLike(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._statusJson);
  }

  //Удаление лайка
  deleteLike(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._statusJson);
  }

  //Удаление карточки
  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._statusJson);
  }

  //Обновление аватара пользователя
  updateUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._statusJson);
  }
}

const api = new Api({
  baseUrl: "https://api.sima.nazarova.students.nomoreparties.space",
});

export default api;
