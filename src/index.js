import './styles/index.css';
import { addCardButton, editProfileButton, closeButtons, popupProfileEdit, popupCardAdd ,formProfileEdit,
    openPopup, openProfileEditPopup, handleEditProfileForm, hidePopup } from './components/modal.js';
import { initialCards, buildCard, prependCard } from "./components/card";



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
closeButtons.forEach(button => {
    button.addEventListener('click', hidePopup)
});


/**
 * Обработка загрузки карточек
 */
//Заполнение карточками
initialCards.forEach(item => {
    const card = buildCard(item.name, item.link);
    prependCard(card);
});



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