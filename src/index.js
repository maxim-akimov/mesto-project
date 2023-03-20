import './styles/index.css';
import { renderLoading } from "./components/utils";
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Сard';
import Section from './components/Section';
import FormValidator from './components/FormValidator';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';



const cardContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.btn_style_add');
const editProfileButton = document.querySelector('.btn_style_edit');
const forms = document.forms;


const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__vocation')

export const cardNameInput = document.querySelector('#placeName');
export const cardAboutInput = document.querySelector('#placeLink')

const cardForm = document.querySelector('.form_action_add-card');
const profileForm = document.querySelector('.form_action_profile-edit')


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
    'Content-Type': 'application/json; charset=UTF-8'
  }
});



api.getUserInfo()
  .then(res => {
    sessionStorage.setItem('user-data', JSON.stringify(res));

    const user = new UserInfo({
      nameElementSelector: '.profile__name',
      aboutElementSelector: '.profile__vocation'
    }, api);

    user.renderData();
  })
  .catch(err => {
    console.error(err);
  });



/**
 * Создание экземпляра класса PoipupWithImage для реализации
 * функционала окна просмотра изображения
 * Создаем только один экземпляр класса, поскольку используется только одно окно для просмотра изображений.
 * Дальнейшая работа окна (изменение src, link, name) будет реализовываться методами
 * созданного экземпляра
 */
const popupViewImage = new PopupWithImage('.popup_action_show-card');



/**
 * Создание экземпляра класса PopupWithForm для реализации
 * функционала окна просмотра подтверждения удаления.
 * Создается 1 экземпляр для реализации логики работы окна подтверждения
 */
const popupRemoveConfirmation = new PopupWithForm('.popup_action_delete-confirmation');



/**
 * Начальная загрузка карточек с сервера
 */
api.getInitialCards()
  .then(res => {
    const section = new Section({
      items: res,
      renderer: (cardItem) => {
        const card = new Card({
          data: cardItem,
          handleCardClick: () => {
            popupViewImage.setEventListeners();
            popupViewImage.openPopup(cardItem);
          },
          handleRemoveClick: () => {
            popupRemoveConfirmation.setEventListeners();
            popupRemoveConfirmation.openPopup(res);
          }
        },
        '#card-template');
        section.addItem(card.generate());
      }
    },
    '.elements')

    section.renderItems();
  })
  .catch(err => {
    console.error(err);
  });



/**
 * Создание экземпляра класса PopupWithForm для реализации логики
 * работы окна добавления карточки
 */
const popupAddCard = new PopupWithForm(
  '.popup_action_add-card',
  (formData, evt) => {
    renderLoading(true, evt.submitter);
    api.insertCard(formData)
      .then(res => {
        const card = new Card({
          data: res,
          handleCardClick: () => {
            popupViewImage.setEventListeners();
            popupViewImage.openPopup(res);
          },
          handleRemoveClick: () => {
            popupRemoveConfirmation.setEventListeners();
            popupRemoveConfirmation.openPopup(res);
          }
        }, '#card-template');
        const section = new Section({}, '.elements');
        section.addItem(card.generate());

        popupAddCard.closePopup();
      })
      .catch(err => {
          console.error(err);
      })
      .finally(() => {
        renderLoading(false, evt.submitter);
      });
});
popupAddCard.setEventListeners();

addCardButton.addEventListener('mousedown', () => {
  popupAddCard.openPopup();
});



/**
 * Создание экземпляра класса PopupWithForm для реализации логики
 * работы окна добавления карточки
 */
const popupEditProfile = new PopupWithForm('.popup_action_edit-profile', () => {
  //TODO
});
popupEditProfile.setEventListeners();

editProfileButton.addEventListener('mousedown', () => {
  popupEditProfile.openPopup();
});


//для валидации
Array.from(forms).forEach(form => {
    const formValidator = new FormValidator({
        inputSelector: '.form__input',
        submitButtonSelector: '.btn_style_submit',
        inactiveButtonClass: 'btn_disabled',
        inputErrorClass: 'form__input_error',
        errorClass: 'form__input-error'
    }, form)
    formValidator.enableValidation();
})