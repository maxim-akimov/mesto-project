import {getUser, getCards} from './api.js'
import {nameElement, vocationElement} from './modal.js'
import {buildCard, prependCard, checkLikeState} from "./card";

const avatarElement = document.querySelector('.profile__avatar');



export function request(url, options) {
    return fetch(url, options).then(checkResponse);
}



export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}



export function renderLoading(isLoading, button, text = 'Сохранить', loadingText = 'Сохранение...') {
    if(isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = text;
    }
}



export function handleSubmit(request, evt, loadingText) {
    evt.preventDefault();

    const submitBtn = evt.submitter;
    const submitBtnInitialText = submitBtn.textContent;

    renderLoading(true, submitBtn, submitBtnInitialText, loadingText);

    request()
        .then(res => {
            evt.target.reset();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, submitBtn, submitBtnInitialText);
        });
}

export function renderData() {
    Promise.all([getUser(), getCards()])
        .then(([user, cards]) => {
            nameElement.textContent = user.name;
            vocationElement.textContent = user.about;
            avatarElement.src = user.avatar;

            cards.forEach(card => {
                const cardMarkup = buildCard(card._id, card.name, card.link,
                    card.likes.length, (user._id === card.owner._id), checkLikeState(user, card.likes));
                prependCard(cardMarkup);
            })
        })
        .catch(err => {
            console.log(err);
        })
}