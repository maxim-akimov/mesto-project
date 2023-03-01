import { checkResponse } from "./utils"



export function getUser() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(checkResponse);
}



export function getCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(checkResponse);
}



export function updateUserProfile(name, vocation) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            name: name,
            about: vocation
        })
    })
    .then(checkResponse);
}



export function addCard(name, link) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
        method: 'POST',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(checkResponse);
}



export function deleteCard(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(checkResponse);
}



export function insertLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(checkResponse);
}



export function deleteLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(checkResponse);
}



export function updateAvatar(avatar) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-21/users/me/avatar `, {
        method: 'PATCH',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then(checkResponse);
}