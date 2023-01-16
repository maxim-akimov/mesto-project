/**
 * Редактирование профиля, отображение информации в профиле
 */

//Элемент для отображения имени пользователя на странице
const nameElement = document.querySelector('.profile__name');

//Элемент для отображения информации "о себе" на странице
const vocationElement = document.querySelector('.profile__vocation');

//Модальное окно редактирования профиля
const popupProfileEdit = document.querySelector('.popup_action_edit-profile');

//Кнопка открытия модального окна
const editProfileButton = document.querySelector('.btn_style_edit');

//Поле ввода имени
const nameInput = popupProfileEdit.querySelector('#profile-name');

//Поле ввода информации "О себе"
const vocationInput = popupProfileEdit.querySelector('#profile-vocation');

//Форма
const formProfileEdit = document.forms['profile-edit'];



/**
 * Добавление новой карточки
 */
//Модальное окно добавления карточки
const popupCardAdd = document.querySelector('.popup_action_add-card');

//Кнопка открытия модального окна добавления новой карточки
const addCardButton = document.querySelector('.btn_style_add');

//Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

//Контейнер для карточек
const cardContainer = document.querySelector('.elements');

//Данные формы
const formCardAdd = document.forms['card-add'];

//Поле ввода названия нового места
const placeNameInput = popupCardAdd.querySelector('#place-name');

//Поле ввода ссылки на изображение нового места
const placeLinkInput = popupCardAdd.querySelector('#place-name');



/**
 * Просмотр карточек с картинками в модальном окне
 */

//Модальное окно просмотра картинок
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
 * Работа модальных окон
 */
//Коллекция всех кнопок закрытия
const closeButtons = document.querySelectorAll('.popup__btn-close');



//Установка слушателя и обработчика событий на кнопки закрытия модальных окон
closeButtons.forEach(button => {
    button.addEventListener('click', closePopup)
});



//Функция реализации закрытия модального окна
function closePopup(evt) {
    const popup = evt.target.closest('.popup');
    if (popup) {
        popup.classList.remove('popup_opened');
    }
}



//Функция добавления модификатора открытого окна
function openPopup(popup) {
    popup.classList.add('popup_opened');
}



//Функция открытия модального окна для просмотра изображений
function openPicturePopup(name, link) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupFigcaptionElement.textContent = name;

    openPopup(popupPictureView);
}



//Функция открытия модального окна для редактирования профиля
function openProfileEditPopup() {
    nameInput.value = nameElement.textContent;
    vocationInput.value = vocationElement.textContent;

    openPopup(popupProfileEdit);
}



/**
 * Подготовка карточки и вставка на страницу
 */
//Подготовка разметки карточки
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



//Создание карточки из каждого элемента массива при загрузке страницы
initialCards.forEach(item => {
    const card = buildCard(item.name, item.link);
    prependCard(card);
});



/**
 * Удаление карточки
 */
function deleteCard(evt) {
    const buttonDeleteElement = evt.target;
    const card = buttonDeleteElement.closest('.element')
    card.remove();
}


/**
 * Лайк
 */
function toggleLike(evt) {
    evt.target.classList.toggle('btn_style_like-active');
}



/**
 * Обработка отправки форм
 **/
//Обработка отправки формы создания новой карточки
function handleCardAddForm(evt) {
    evt.preventDefault();

    if(placeNameInput.value && placeLinkInput.value) {
        const card = buildCard(placeNameInput.value, placeLinkInput.value)
        prependCard(card);

        closePopup(evt);
        formCardAdd.reset();
    }
}



//Обработка отправки формы редактирования профиля
function handleEditProfileForm(evt) {
    evt.preventDefault();

    if (nameInput.value && vocationInput.value) {
        nameElement.textContent = nameInput.value;
        vocationElement.textContent = vocationInput.value;
    }

    closePopup(evt);
    formProfileEdit.reset();
}



/**
 * Назначение слушателей событий элементам страницы
 */
//Нажатие на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => openProfileEditPopup(popupProfileEdit));



//Отправка формы редактирования профиля
formProfileEdit.addEventListener('submit', handleEditProfileForm);



//Нажатие на кнопку добавления новой карточки
addCardButton.addEventListener('click', () => openPopup(popupCardAdd));



//Отправка формы добавления новой карточки
formCardAdd.addEventListener('submit', handleCardAddForm);






















