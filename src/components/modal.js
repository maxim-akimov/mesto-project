import { buildCard, prependCard } from "./card";


export const popups = document.querySelectorAll('.popup');


/**
 * Редактирование профиля, отображение информации в профиле
 */
//Элемент для отображения имени пользователя на странице
const nameElement = document.querySelector('.profile__name');

//Элемент для отображения информации "о себе" на странице
const vocationElement = document.querySelector('.profile__vocation');

//Коллекция всех кнопок закрытия
export const closeButtons = document.querySelectorAll('.popup__btn-close');

//Модальное окно редактирования профиля
export const popupProfileEdit = document.querySelector('.popup_action_edit-profile');

//Кнопка открытия модального окна
export const editProfileButton = document.querySelector('.btn_style_edit');

//Форма
export const formProfileEdit = document.forms.profileEdit;



/**
 * Добавление новой карточки
 */
//Модальное окно добавления карточки
export const popupCardAdd = document.querySelector('.popup_action_add-card');

//Кнопка открытия модального окна добавления новой карточки
export const addCardButton = document.querySelector('.btn_style_add');

//Данные формы
const formCardAdd = document.forms.cardAdd;



/**
 * Просмотр карточек с картинками в модальном окне
 */

//Модальное окно просмотра картинок
const popupPictureView = document.querySelector('.popup_action_show-card');

//Элемент popup__image модального окна просмотра
const popupImageElement = popupPictureView.querySelector('.popup__image');

//Элемент подписи к изображению
const popupFigcaptionElement = popupPictureView.querySelector('.popup__figcaption');



//Функция удаления модификатора открытого окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


//todo перенести в index.js
//Отправка формы добавления новой карточки
formCardAdd.addEventListener('submit', handleCardAddForm);



//Функция реализации закрытия модального окна
export function hidePopup(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if(evt.key === 'Escape' && openedPopup) {
        closePopup(openedPopup);
    } else if((!evt.target.closest('.popup__container') &&
        !evt.target.closest('.popup__figure')) ||
        evt.target.classList.contains('popup__btn-close')) {
        const popup = evt.target.closest('.popup');
        if (popup) {
            closePopup(popup);
        }
    }
}



//Функция добавления модификатора открытого окна
export function openPopup(popup) {
    popup.classList.add('popup_opened');
}



//Функция открытия модального окна для просмотра изображений
export function openPicturePopup(name, link) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupFigcaptionElement.textContent = name;

    openPopup(popupPictureView);
}



//Функция открытия модального окна для редактирования профиля
export function openProfileEditPopup() {
    formProfileEdit.profileName.value = nameElement.textContent;
    formProfileEdit.profileVocation.value = vocationElement.textContent;

    openPopup(popupProfileEdit);
}



//Обработка отправки формы создания новой карточки
function handleCardAddForm(evt) {
    evt.preventDefault();

    if(formCardAdd.placeName.value && formCardAdd.placeLink.value) {
        const card = buildCard(formCardAdd.placeName.value, formCardAdd.placeLink.value)
        prependCard(card);

        hidePopup(evt);
        formCardAdd.reset();
    }
}



//Обработка отправки формы редактирования профиля
export function handleEditProfileForm(evt) {
    evt.preventDefault();

    if (formProfileEdit.profileName.value && formProfileEdit.profileVocation.value) {
        nameElement.textContent = formProfileEdit.profileName.value;
        vocationElement.textContent = formProfileEdit.profileVocation.value;
    }

    hidePopup(evt);
    formProfileEdit.reset();
}