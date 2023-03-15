import { request } from "./utils"



const headers = {
    authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
    'Content-Type': 'application/json; charset=UTF-8'
};



export function getUser() {
    return request(
        'https://nomoreparties.co/v1/plus-cohort-21/users/me', 
        { headers }
    );
}



export function getCards() {
    return request(
        'https://nomoreparties.co/v1/plus-cohort-21/cards', 
        { headers }
    );
}



export function updateUserProfile(name, vocation) {
    return request(
        'https://nomoreparties.co/v1/plus-cohort-21/users/me', 
        { 
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                name: name,
                about: vocation
            })
        }
    );
}



export function addCard(name, link) {
    return request(
        'https://nomoreparties.co/v1/plus-cohort-21/cards', 
        { 
            method: 'POST',
            headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }
    );
}



export function deleteCard(id) {
    return request(
        `https://nomoreparties.co/v1/plus-cohort-21/cards/${id}`, 
        { 
            method: 'DELETE',
            headers
        }
    );
}



export function insertLike(cardId) {
    return request(
        `https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, 
        { 
            method: 'PUT',
            headers
        }
    );
}



export function deleteLike(cardId) {
    return request(
        `https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${cardId}`, 
        { 
            method: 'DELETE',
            headers
        }
    );
}



export function updateAvatar(avatar) {
    return request(
        `https://nomoreparties.co/v1/plus-cohort-21/users/me/avatar`, 
        { 
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }
    );
}