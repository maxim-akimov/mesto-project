import {getUser, getCards} from './api.js'
import {nameElement, vocationElement} from './modal.js'
import {buildCard, prependCard} from "./card";

const avatarElement = document.querySelector('.profile__avatar');

export function renderUser() {
    getUser()
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => {
            nameElement.textContent = res.name;
            vocationElement.textContent = res.about;
            avatarElement.src = res.avatar;

        })
        .catch(err => {
            console.log(err);
        })
}



export function renderCards() {
    getCards()
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => {
            getUser()
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
                .then(userRes => {
                    res.forEach(card => {
                        const cardMarkup = buildCard(card.name, card.link,
                            card.likes.length, (userRes._id === card.owner._id));
                        prependCard(cardMarkup);
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
}