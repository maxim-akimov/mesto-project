import { insertLike, deleteLike } from "./api";
import {openPicturePopup} from "./modal";



//Контейнер для карточек
export const cardContainer = document.querySelector('.elements');

//Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;



/**
 * Подготовка карточки и вставка на страницу
 */
//Подготовка разметки карточки
export function buildCard(id, name, link, likes, isRemovable, hasLike) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');

    cardElement.setAttribute('data-card-id', id);
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.element__heading').textContent = name;
    cardElement.querySelector('.element__like-counter').textContent = likes;

    if(!isRemovable) {
        cardElement.querySelector('.btn_style_delete').remove();
    }

    if(hasLike) {
        cardElement.querySelector('.btn_style_like').classList.add('btn_style_like-active')
    }

    //cardElement.querySelector('.btn_style_like').addEventListener('click', toggleLike);
    cardImage.addEventListener('click', () => openPicturePopup(name, link));

    return cardElement;
}



export function checkLikeState(user, likes) {
    if(likes) {
        for(let i = 0; i < likes.length; i++ ) {
            if(user._id === likes[i]._id) {
                return true;
            }
        }
    }
    return false;
}



//Вставка карточки в разметку страницы
export function prependCard(cardObject) {
    cardContainer.prepend(cardObject)
}



export function deleteCardMarkup(id) {
    cardContainer.querySelector(`.element[data-card-id="${id}"]`).remove();
}


//Постановка лайка
export function setLike(evt) {
    if (evt.target.classList.contains('btn_style_like')) {
        const likeButton = evt.target;
        const cardElement = evt.target.closest('.element');
        const cardId = cardElement.dataset.cardId;

        likeButton.style.visibility = 'hidden';

        insertLike(cardId)
            .then(res => {
                evt.target.classList.add('btn_style_like-active');
                cardElement.querySelector('.element__like-counter').textContent = res.likes.length;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                likeButton.style.visibility = 'visible';
            });
    }
}



//Снятие лайка
export function resetLike(evt) {
    if (evt.target.classList.contains('btn_style_like')) {
        const likeButton = evt.target;
        const cardElement = evt.target.closest('.element');
        const cardId = cardElement.dataset.cardId;

        likeButton.style.visibility = 'hidden';

        deleteLike(cardId)
            .then(res => {
                evt.target.classList.remove('btn_style_like-active');
                cardElement.querySelector('.element__like-counter').textContent = res.likes.length;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                likeButton.style.visibility = 'visible';
            });
    }
}



export function toggleLike(evt) {
    if (evt.target.classList.contains('btn_style_like')) {
        if(evt.target.classList.contains('btn_style_like-active')) {
            resetLike(evt);
        } else {
            setLike(evt);
        }
    }
}