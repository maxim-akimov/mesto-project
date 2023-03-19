export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }



  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }



  insertCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
<<<<<<< HEAD
      headers: this._headers,
      body: JSON.stringify(data)
      /*body: JSON.stringify(
        {
          name: data.name,
          link: data.link
        }
      )*/
=======
      body: JSON.stringify(data),
      headers: this._headers
    })
      .then(this._checkResponse);
  }



  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }



  insertLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
    })
      .then(this._checkResponse);
  }



<<<<<<< HEAD
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
=======
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }



<<<<<<< HEAD
  insertLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
=======
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
      headers: this._headers
    })
      .then(this._checkResponse);
  }



<<<<<<< HEAD
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
=======
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
      headers: this._headers
    })
      .then(this._checkResponse);
  }



<<<<<<< HEAD
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
=======
  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(data),
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
      headers: this._headers
    })
      .then(this._checkResponse);
  }



<<<<<<< HEAD
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this._headers
    })
      .then(this._checkResponse);
  }



  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this._headers
    })
      .then(this._checkResponse);
  }



=======
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}