import '../styles/index.css';
import { popups, addCardButton, editProfileButton, formCardAdd, popupCardAdd ,formProfileEdit,
    openPopup, openProfileEditPopup, handlePopupClose, handleEditProfileForm, handleCardAddForm, 
    openDeleteConfirmationPopup, handleDeleteCardConfirmation, editAvatarButton, openEditAvatarPopup, 
    formAvatarEdit, handleEditAvatarForm, formCardDelete} from './modal.js';
import { cardContainer, toggleLike} from "./card";
import { enableValidation} from "./validate";
import { renderData } from "./utils.js";


/**
 * Назначение слушателей событий элементам страницы
 */
//Нажатие на кнопку редактирования профиля
editProfileButton.addEventListener('click', openProfileEditPopup);

//Нажатие на кнопку добавления новой карточки
addCardButton.addEventListener('click', () => openPopup(popupCardAdd));

//Отправка формы редактирования профиля
formProfileEdit.addEventListener('submit', handleEditProfileForm);

//Нажатие на кнопку редактирования аватара
editAvatarButton.addEventListener('click', openEditAvatarPopup);

//Отправка формы редактирования аватара
formAvatarEdit.addEventListener('submit', handleEditAvatarForm);

//Отправка формы удаления карточки
formCardDelete.addEventListener('submit', handleDeleteCardConfirmation);

//Отправка формы добавления новой карточки
formCardAdd.addEventListener('submit', handleCardAddForm);

//Удаление карточки
cardContainer.addEventListener('mousedown', openDeleteConfirmationPopup);

//Постановка / удаление лайка
//cardContainer.addEventListener('mousedown', toggleLike);

//Установка слушателя и обработчика событий на модальные окна
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        handlePopupClose(evt);
    })
})



/**
 * Загрузка информации о пользователе и карточек
 */
renderData();



/**
 * Валидация форм
 */
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.btn_style_submit',
    inactiveButtonClass: 'btn_disabled',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error'
})



/**
 * Предотвращение автоматического срабатывания анимации
 * при загрузке страницы в Google Chrome
 *
 * Поскольку обнаружилась проблема при открытии страницы в Google Chrome - при
 * загрузке автоматически воспроизводились анимации, (открывались и сразу же
 * анимированно скрывались все модальные окна), было принято решение
 * изначально скрыть элементы неанимируемым свойством display до момента полной
 * загрузки страницы, а после вернуть display этих элементов в запланированное
 * состояние.
 *
 * Для блоков с классом popup в css определен display: none
 * После завершения загрузки возвращаем display в нормальное состояние -
 * display: flex - для корректного отображения модальных окон их анимации.
 */
function preventChromeLoadTransition() {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(item => {
        item.style.display = 'flex';
    })
}

window.addEventListener('load', preventChromeLoadTransition)