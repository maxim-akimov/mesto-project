import './styles/index.css';
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Card';
import Popup from './components/Popup';
import { Section } from './components/Section';
import PopupWithImage from './components/PopupWithImage';
//import PopupWithImage from './components/PopupWithImage';
//import PopupWithForm from './components/PopupWithForm';



export const cardContainer = document.querySelector('.elements');


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
            const popup = new PopupWithImage(cardItem, '.popup_action_show-card');
            popup.open();
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

