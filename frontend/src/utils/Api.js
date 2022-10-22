class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    // проверка ответа
    if (!res.ok) {
      console.log(res.json());
      return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfoApi(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data['name'],
        about: data['about'],
      }),
    }).then(this._checkResponse);
  }

  setUserAvatarApi(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  getCardsApi() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addNewCardApi(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data['name'],
        link: data['link'],
      }),
    }).then(this._checkResponse);
  }

  deleteCardApi(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(_id, action) {
    if (action) {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }

  likeCardApi(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCardApi(data) {
    return fetch(`${this._baseUrl}/cards/${data._cardID}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
const token = localStorage.getItem('jwt');

const API_CONFIG = {
  baseUrl: 'https://mesto-backend-jc.nomoredomains.icu',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

// Инстанс класса api
const api = new Api(API_CONFIG);

export default api;
