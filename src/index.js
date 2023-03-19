import './styles/index.css';
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Сard';
import Section from './components/Section';
<<<<<<< HEAD
import FormValidator from './components/FormValidator';
=======
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b

import Popup from './components/Popup';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';



const cardContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.btn_style_add');
const editProfileButton = document.querySelector('.btn_style_edit');
<<<<<<< HEAD

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__vocation')

export const cardNameInput = document.querySelector('#placeName');
export const cardAboutInput = document.querySelector('#placeLink')

const cardForm = document.querySelector('.form_action_add-card');
const profileForm = document.querySelector('.form_action_profile-edit')


=======
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b


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
<<<<<<< HEAD
    
=======
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
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
           //TODO открываем попап подтверждения удаления
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
<<<<<<< HEAD
    const popup = new PopupWithForm('.popup_action_add-card', (formData) => {
      console.log(formData)
      api.insertCard(formData)
        .then(res => {
        console.log(res)
        const section = new Section({
          items: res, 
          renderer: (cardItem) => {
          const card = new Card({
            data: cardItem, 
            handleCardClick: () => {
            const popup = new PopupWithImage('.popup_action_show-card');
            popup.setEventListeners();
            openPopup(cardItem)
        },
        handleRemoveClick: () => {}
      },'#card-template');
        cardContainer.append(card.generate())
        }
      }, 'elements') 
      section.addItem(card)
  })
  .catch(err => {
    console.error(err);
  });

    })
    popup.setEventListeners();
    popup.openPopup();
    const popupValidation = new FormValidator(settings, cardForm)
        popupValidation.enableValidation()
        
})



editProfileButton.addEventListener('mousedown', () => {
    const popup = new PopupWithForm('.popup_action_edit-profile', () => {
      //TODO
    })
    popup.setEventListeners();
    popup.openPopup();

    const popupValidation = new FormValidator(settings, profileForm)
      popupValidation.enableValidation()
})
//для валидации

const settings = ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn_style_submit',
  inactiveButtonClass: 'btn_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error'
})

//попап удаления
/*const trashButton = document.querySelector('.btn_style_delete');
trashButton.addEventListener('click', () => {
  const popup = new PopupWithForm('.popup_action_delete-confirmation', () => {
    //TODO

  })
})*/
=======
    const popup = new PopupWithForm('.popup_action_add-card', () => {
        //TODO submit
    })
    popup.setEventListeners();
    popup.openPopup();
})


editProfileButton.addEventListener('mousedown', () => {
    const popup = new PopupWithForm('.popup_action_edit-profile', () => {
        //TODO submit
    })
    popup.setEventListeners();
    popup.openPopup();
})
>>>>>>> 28c768f0db80f7c1dccb2194f2747dd956440d4b
