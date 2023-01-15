/**
 * Заполнение модельного окна данными для отображения картинки
 */
function fillingPopup (evt) {
    const cardImageElement = evt.target;
    const popup = document.querySelector('.popup_action_show-card');
    const popupImage = popup.querySelector('.popup__image');

    popupImage.src = cardImageElement.src;
    popupImage.alt = cardImageElement.alt;
    popup.querySelector('.popup__figcaption').textContent = cardImageElement.alt;
}



/**
 * Начальная загрузка карточек при открытии страницы
 **/

//Массив карточек
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

//Создание разметки карточки
function buildCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');

    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.element__heading').textContent = name;
    cardElement.querySelector('.btn_style_like').addEventListener('click', toggleLike);
    cardElement.querySelector('.btn_style_delete').addEventListener('click', deleteCard);
    cardImage.addEventListener('click', function(evt) {
        fillingPopup(evt);
        showPopup('.popup_action_show-card');
    });

    return cardElement;
}

//Вставка карточки в разметку страницы
function prependCard(cardObject) {
    document.querySelector('.elements').prepend(cardObject)
}

//Создание карточки из каждого элемента массива
for (let i = 0; i < initialCards.length; i++) {
    const card = buildCard(initialCards[i].name, initialCards[i].link);
    prependCard(card);
}


/**
 * Удаление карточки
 */

function deleteCard(evt) {
    const buttonDeleteElement = evt.target;
    const card = buttonDeleteElement.closest('.element')
    card.remove();
}



/**
 * Работа модальных окон
 **/

//Открытие окна
function showPopup(selector) {
    const popup = document.querySelector(selector);
    const closeButton = popup.querySelector('.popup__btn-close');

    popup.classList.remove('popup_state_closed');
    popup.classList.add('popup_state_opened');

    closeButton.addEventListener('click', hidePopup);
}

//Закрытие окна
function hidePopup(evt) {
    const popup = evt.target.closest('.popup');

    popup.classList.remove('popup_state_opened');
    popup.classList.add('popup_state_closed');
}



/**
 * Добавление новой карточки
 **/

const addButton = document.querySelector('.btn_style_add');
const formAddCardElement = document.querySelector('.form_action_add-card');

//Обработка отправки формы
function submitAddCardFormHandler(evt) {
    evt.preventDefault();
    const nameAddCardField = formAddCardElement.querySelector('#place-name');
    const linkAddCardField = formAddCardElement.querySelector('#place-link');

    if(nameAddCardField.value && linkAddCardField.value) {
        const card = buildCard(nameAddCardField.value, linkAddCardField.value)
        prependCard(card);

        hidePopup(evt);

        nameAddCardField.value = '';
        linkAddCardField.value = '';
    }
}

//Открытие модального окна для добавления карточки
addButton.addEventListener('click', function () {
    showPopup('.popup_action_add-card');
})

//Прослушивание события отправки формы
formAddCardElement.addEventListener('submit', submitAddCardFormHandler)




/**
 * Редактирование профиля
 **/

const editButton = document.querySelector('.btn_style_edit');
const nameElement = document.querySelector('.profile__name');
const vocationElement = document.querySelector('.profile__vocation');
const formElement = document.querySelector('.form_action_profile-edit');
const nameField = formElement.querySelector('#name');
const vocationField = formElement.querySelector('#vocation');

//Обработка отправки формы
function submitFormHandler(evt) {
    evt.preventDefault();

    nameElement.textContent = nameField.value;
    vocationElement.textContent = vocationField.value;

    hidePopup(evt);
}

//Открытие модального окна для редактирования профиля
editButton.addEventListener('click', function () {
    nameField.value = nameElement.textContent;
    vocationField.value = vocationElement.textContent;

    showPopup('.popup_action_edit-profile');
})

//Прослушивание события отправки формы
formElement.addEventListener('submit', submitFormHandler)



function toggleLike(evt) {
    const buttonLikeElement = evt.target;
    buttonLikeElement.classList.toggle('btn_style_like-active');
}




