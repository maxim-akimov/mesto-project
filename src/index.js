import './styles/index.css';
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Сard';
import Section from './components/Section';

import Popup from './components/Popup';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';



const cardContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.btn_style_add');
const editProfileButton = document.querySelector('.btn_style_edit');


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