const initialCards = [
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

function cardBuilder(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__image').src = link;
    cardElement.querySelector('.element__image').alt = name;
    cardElement.querySelector('.element__heading').textContent = name;
    cardElement.querySelector('.btn_style_like').addEventListener('click', toggleLike);
    cardElement.querySelector('.btn_style_delete').addEventListener('click', cardDelete);

    return cardElement;
}

function cardInsert(cardObject) {
    document.querySelector('.elements').prepend(cardObject)
}

for (let i = 0; i < initialCards.length; i++) {
    const card = cardBuilder(initialCards[i].name, initialCards[i].link);
    cardInsert(card);
}

function cardDelete(evt) {
    const buttonDeleteElement = evt.target;
    const card = buttonDeleteElement.closest('.element')
    card.remove();
}