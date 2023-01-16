/**
 * Редактирование профиля, отображение информации в профиле
 */

//Элемент для отображения имени пользователя на странице
const nameElement = document.querySelector('.profile__name');

//Элемент для отображения информации "о себе" на странице
const vocationElement = document.querySelector('.profile__vocation');

//Моlальное окно редактирования профиля
const popupProfileEdit = document.querySelector('.popup_action_edit-profile');

//Кнопка открытия модального окна
const editProfileButton = document.querySelector('.btn_style_edit');

//Поле ввода имени
const nameInput = popupProfileEdit.querySelector('#profile-name');

//Поле ввода информации "О себе"
const vocationInput = popupProfileEdit.querySelector('#profile-vocation');



/**
 * Добавление новой карточки
 */
//Моlальное окно добавления карточки
const popupCardAdd = document.querySelector('.popup_action_add-card');

//Кнопка открытия модального окна добавления новой карточки
const addCardButton = document.querySelector('.btn_style_add');

//Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

//Контейнер для карточек
const cardContainer = document.querySelector('.elements')



/**
 * Просмотр карточек с картинками в модальном окне
 */

//Моlальное окно просмотра картинок
const popupPictureView = document.querySelector('.popup_action_show-card');

//Элемент popup__image модального окна просмотра
const popupImageElement = popupPictureView.querySelector('.popup__image');

//Элемент подписи к изображению
const popupFigcaptionElement = popupPictureView.querySelector('.popup__figcaption');

//Массив для начального заполнения карточек
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


/**
 * Закрытие модальных окон
 */
//Коллекция всех кнопок закрытия
const closeButtons = document.querySelectorAll('.popup__btn-close');



/**
 * Установка слушателя и обработчика событий на кнопки закрытия модальных окон 
 */
closeButtons.forEach(button => {
    button.addEventListener('click', closePopup)
});



/**
 * Функция добавления модификатора открытого окна
 */
function openPopup(popup) {
    popup.classList.add('popup_opened');
}



/**
 * Открытие модального окна для просмотра изображений
 */
function openPicturePopup(name, link) {
    popupImageElement.src = link;
    popupImageElement.alt = name;

    openPopup(popupPictureView);
}



/**
 * Функция открытия модального окна для редактирования профиля
 */
function openProfileEditPopup() {
    nameInput.value = nameElement;
    vocationInput = vocationElement;

    openPopup(popupProfileEdit);
}



/**
 * Функция открытия модального окна для добавления новой карточки
 */
function openCardAddPopup() {
    openPopup(popupCardAdd);
}



/**
 * Подготовка разметки карточки
 */
function buildCard(name, link) {
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
function prependCard(cardObject) {
    cardContainer.prepend(cardObject)
}



/**
 * Начальная загрузка карточек при открытии страницы
 **/

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




//Закрытие окна
function closePopup(evt) {
    const popup = evt.target.closest('.popup');

    popup.classList.remove('popup_opened');
}



/**
 * Добавление новой карточки
 **/


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
addCardButton.addEventListener('click', () => openPopup(popupCardAdd))

//Прослушивание события отправки формы
//formAddCardElement.addEventListener('submit', submitAddCardFormHandler)










/**
 * Редактирование профиля
 **/
//Обработка отправки формы
function submitFormHandler(evt) {
    evt.preventDefault();

    nameElement.textContent = nameField.value;
    vocationElement.textContent = vocationField.value;

    hidePopup(evt);
}

//Открытие модального окна для редактирования профиля
editProfileButton.addEventListener('click', function () {
    nameInput.value = nameElement.textContent;
    vocationInput.value = vocationElement.textContent;

    openPopup(popupProfileEdit);
})

//Прослушивание события отправки формы
//formElement.addEventListener('submit', submitFormHandler)

















function toggleLike(evt) {
    const buttonLikeElement = evt.target;
    buttonLikeElement.classList.toggle('btn_style_like-active');
}




