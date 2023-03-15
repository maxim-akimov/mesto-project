import '../styles/index.css';

import Api from './Api'
import Card from './Card'


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
    'Content-Type': 'application/json; charset=UTF-8'
  }
});


const cards = api.getInitialCards().then((res) => {
  res.forEach(cardData => {
    const card = new Card({
      data: cardData,
      handleCardClick: () => {
        //TODO
      }
    }, '#card-template');

    console.log(card.generate());
  })
});

