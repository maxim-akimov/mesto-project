import {nameElement, openPicturePopup, vocationElement} from "./modal";
import {getUser} from "./api";
//Контейнер для карточек
const cardContainer = document.querySelector('.elements');

//Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;



/**
 * Подготовка карточки и вставка на страницу
 */
//Подготовка разметки карточки
export function buildCard(name, link, likes, isRemovable) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');

    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.element__heading').textContent = name;
    cardElement.querySelector('.element__like-counter').textContent = likes;

    if(!isRemovable) {
        cardElement.querySelector('.btn_style_delete').remove();
    } else {
        cardElement.querySelector('.btn_style_delete').addEventListener('click', deleteCard);
    }

    cardElement.querySelector('.btn_style_like').addEventListener('click', toggleLike);
    cardImage.addEventListener('click', () => openPicturePopup(name, link));

    return cardElement;
}



//Вставка карточки в разметку страницы
export function prependCard(cardObject) {
    cardContainer.prepend(cardObject)
}



//Удаление карточки
function deleteCard(evt) {
    evt.target.closest('.element').remove();
}


//Лайк
function toggleLike(evt) {
    evt.target.classList.toggle('btn_style_like-active');
}