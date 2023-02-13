import { openPicturePopup } from "./modal";
//Контейнер для карточек
const cardContainer = document.querySelector('.elements');

//todo
/*
cardContainer.addEventListener('click', (evt) => {
    console.log(evt.target.classList.contains('element__image'));
})
 */

//Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

//Массив для начального заполнения карточек
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



/**
 * Подготовка карточки и вставка на страницу
 */
//Подготовка разметки карточки
export function buildCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');

    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.element__heading').textContent = name;
    cardElement.querySelector('.btn_style_like').addEventListener('click', toggleLike);
    cardElement.querySelector('.btn_style_delete').addEventListener('click', deleteCard);
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