import './styles/index.css';
import { renderLoading } from "./components/utils";
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Сard';
import Section from './components/Section';
import FormValidator from './components/FormValidator';
import Popup from './components/Popup';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';



const cardContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.btn_style_add');
const editProfileButton = document.querySelector('.btn_style_edit');

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




api.getInitialCards()
  .then(res => {
    const section = new Section({
      items: res,
      renderer: (cardItem) => {
        const card = new Card({
          data: cardItem,
          handleCardClick: () => {
            const popup = new PopupWithImage('.popup_action_show-card');
            popup.setEventListeners();
            popup.openPopup(cardItem);
          },
          handleRemoveClick: () => {
              const popup = new PopupWithForm('.popup_action_delete-confirmation');
              popup.setEventListeners();
              popup.openPopup(res);
          }
        },
        '#card-template');
        cardContainer.prepend(card.generate());
      }
    },
    'elements')

    section.renderItems();
  })
  .catch(err => {
    console.error(err);
  });



addCardButton.addEventListener('mousedown', () => {
    const popup = new PopupWithForm(
        '.popup_action_add-card',
        (formData) => {
            //renderLoading(true);
            api.insertCard(formData)
                .then(res => {
                    const card = new Card({
                        data: res,
                        handleCardClick: () => {
                            const popup = new PopupWithImage('.popup_action_show-card');
                            popup.setEventListeners();
                            popup.openPopup(res);
                        },
                        handleRemoveClick: () => {
                            const popup = new PopupWithForm('.popup_action_delete-confirmation');
                            popup.setEventListeners();
                            popup.openPopup(res);
                        }
                    }, '#card-template');
                    const section = new Section({}, '.elements');
                    section.addItem(card.generate());
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    //renderLoading(false);
                })
        });

    popup.setEventListeners();
    popup.openPopup();
})


/*
addCardButton.addEventListener('mousedown', () => {
    const popup = new PopupWithForm('.popup_action_add-card', (formData) => {
      api.insertCard(formData)
        .then(res => {
        const section = new Section({
          items: res,
          renderer: (cardItem) => {
              console.log(cardItem)
            const card = new Card({
                data: cardItem,
                handleCardClick: () => {
                    const popup = new PopupWithImage('.popup_action_show-card');
                    popup.setEventListeners();
                    popup.openPopup(cardItem)
                },
                handleRemoveClick: () => {}
            },'#card-template');
              console.log(card.generate())
        cardContainer.prepend(card.generate());
        }
      }, '.elements')
      section.addItem()
      })
      .catch(err => {
        console.error(err);
      });

    })
    popup.setEventListeners();
    popup.openPopup();
})*/



editProfileButton.addEventListener('mousedown', () => {
    const popup = new PopupWithForm('.popup_action_edit-profile', () => {
      //TODO
    })
    popup.setEventListeners();
    popup.openPopup();
})


//для валидации

const forms = document.forms;
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


//попап удаления
/*const trashButton = document.querySelector('.btn_style_delete');
trashButton.addEventListener('click', () => {
  const popup = new PopupWithForm('.popup_action_delete-confirmation', () => {
    //TODO

  })
})*/
