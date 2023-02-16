import '../styles/index.css';
import { popups, addCardButton, editProfileButton, closeButtons, popupProfileEdit, popupCardAdd ,formProfileEdit,
    openPopup, openProfileEditPopup, handleEditProfileForm, hidePopup } from './modal.js';
import { initialCards, buildCard, prependCard } from "./card";
import { enableValidation} from "./validate";


/**
 * Назначение слушателей событий элементам страницы
 */
//Нажатие на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => openProfileEditPopup(popupProfileEdit));

//Нажатие на кнопку добавления новой карточки
addCardButton.addEventListener('click', () => openPopup(popupCardAdd));

//Отправка формы редактирования профиля
formProfileEdit.addEventListener('submit', handleEditProfileForm);

//Установка слушателя и обработчика событий на кнопки закрытия модальных окон
popups.forEach(popup => {
    popup.addEventListener('click', hidePopup)
})
window.addEventListener('keyup', hidePopup);


/**
 * Обработка загрузки карточек
 */
//Заполнение карточками
initialCards.forEach(item => {
    const card = buildCard(item.name, item.link);
    prependCard(card);
});


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