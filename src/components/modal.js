import {buildCard, prependCard, deleteCardMarkup} from "./card";
import {updateUserProfile, addCard, deleteCard, updateAvatar} from "./api";



export const popups = document.querySelectorAll('.popup');



/**
 * Редактирование профиля, отображение информации в профиле
 */
//Элемент для отображения имени пользователя на странице
export const nameElement = document.querySelector('.profile__name');

//Элемент для отображения информации "о себе" на странице
export const vocationElement = document.querySelector('.profile__vocation');


//Модальное окно редактирования профиля
export const popupProfileEdit = document.querySelector('.popup_action_edit-profile');

//Кнопка открытия модального окна
export const editProfileButton = document.querySelector('.btn_style_edit');

//Форма
export const formProfileEdit = document.forms.profileEdit;

//Кнопка отправки формы
const editProfileSubmitButton = formProfileEdit.elements.submit;

//Модальное окно редактирования аватара
export const popupAvatarEdit = document.querySelector('.popup_action_edit-avatar');

//Кнопка открытия модального окна
export const editAvatarButton = document.querySelector('.profile__avatar-wrap');

//Аватар
export const avatarElement = document.querySelector('.profile__avatar');

//Форма
export const formAvatarEdit = document.forms.editAvatar;

//Кнопка отправки формы
const editAvatarSubmitButton = formAvatarEdit.elements.submit;



/**
 * Добавление новой карточки
 */
//Модальное окно добавления карточки
export const popupCardAdd = document.querySelector('.popup_action_add-card');

//Кнопка открытия модального окна добавления новой карточки
export const addCardButton = document.querySelector('.btn_style_add');

//Данные формы
export const formCardAdd = document.forms.cardAdd;

//Кнопка сабмита
const submitCardAddBtn = formCardAdd.querySelector('.btn_style_submit');



/**
 * Просмотр карточек с картинками в модальном окне
 */

//Модальное окно просмотра картинок
const popupPictureView = document.querySelector('.popup_action_show-card');

//Элемент popup__image модального окна просмотра
const popupImageElement = popupPictureView.querySelector('.popup__image');

//Элемент подписи к изображению
const popupFigcaptionElement = popupPictureView.querySelector('.popup__figcaption');



/**
 * Удаление карточки
 */
//Окно подтверждения
export const popupDeleteConfurmation = document.querySelector('.popup_action_delete-confirmation');

//Кнопк подтверждения
export const deleteConfirmationButton = popupDeleteConfurmation.querySelector('.btn_style_submit');



//Функция удаления модификатора открытого окна
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    window.removeEventListener('keyup', handleEscape);
}



//Функция добавления модификатора открытого окна
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener('keyup', handleEscape);
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



export function openDeleteConfirmationPopup(evt) {
    if(evt.target.classList.contains('btn_style_delete')) {
        deleteConfirmationButton.setAttribute('data-card-id', evt.target.closest('.element').id);
        openPopup(popupDeleteConfurmation)
    }
}



export function openEditAvatarPopup() {
    formAvatarEdit.elements.avatarLink.value = avatarElement.src;
    openPopup(popupAvatarEdit);
} 



//Обработчик нажатия на клавишу Escape
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}


export function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__btn-close')) {
        closePopup(evt.target.closest('.popup'));
    }
}


//Обработка отправки формы создания новой карточки
export function handleCardAddForm(evt) {
    evt.preventDefault();

    addCard(formCardAdd.placeName.value, formCardAdd.placeLink.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => {
            const card = buildCard(res._id, res.name, res.link, res.likes.length, true)
            prependCard(card);
        })
        .catch(err => {
            console.log(err);
        });

    closePopup(popupCardAdd);
    formCardAdd.reset();
    console.log(submitCardAddBtn)
    submitCardAddBtn.disabled = true;
    submitCardAddBtn.classList.add('btn_disabled');
}


//Обработка отправки формы редактирования профиля
export function handleEditProfileForm(evt) {
    evt.preventDefault();

    editProfileSubmitButton.textContent = 'Сохранение...';

    updateUserProfile(formProfileEdit.profileName.value, formProfileEdit.profileVocation.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => {
            nameElement.textContent = res.name;
            vocationElement.textContent = res.about;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            editProfileSubmitButton.textContent = 'Сохранить';
        });

    closePopup(popupProfileEdit);
    formProfileEdit.reset();
}



export function handleDeleteCardConfirmation(evt) {
    const cardId = evt.target.dataset.cardId.replace('_', '');
    deleteConfirmationButton.textContent = 'Удаление..';
    deleteConfirmationButton.disabled = true;
    deleteConfirmationButton.classList.add('btn_disabled')

    deleteCard(cardId)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => {
            deleteCardMarkup(cardId);
            closePopup(popupDeleteConfurmation);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            deleteConfirmationButton.textContent = 'Да';
            deleteConfirmationButton.disabled = false;
            deleteConfirmationButton.classList.remove('btn_disabled')
        });
    }



export function handleEditAvatarForm(evt) {
    evt.preventDefault();

    editAvatarSubmitButton.textContent = 'Сохранение...';

    updateAvatar(formAvatarEdit.elements.avatarLink.value)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => {
            avatarElement.src = res.avatar;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            editAvatarSubmitButton.textContent = 'Сохранить';
        });

    closePopup(popupAvatarEdit);
    formAvatarEdit.reset();
}

