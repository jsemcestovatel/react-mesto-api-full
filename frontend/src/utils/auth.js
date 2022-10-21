class Auth {
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

  signUpApi(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  signInApi(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  signOutApi() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
    }).then(this._checkResponse);
  }

  authApi(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const API_CONFIG = {
  baseUrl: 'https://mesto-backend-jc.nomoredomains.icu',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// Инстанс класса auth
const auth = new Auth(API_CONFIG);

export default auth;
