import './styles/index.css';
import {
  renderLoading,
  addCardButton,
  editProfileButton,
  forms,
  changeAvatarButton,
  profileNameInput,
  profileAboutInput,
  cardIdInput
} from './components/utils';
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Сard';
import Section from './components/Section';
import FormValidator from './components/FormValidator';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';
import PopupRemoveCard from "./components/PopupRemoveCard";


/**
 * Создание экземпляра класса PoipupWithImage для реализации
 * функционала окна просмотра изображения
 * Создаем только один экземпляр класса, поскольку используется только одно окно для просмотра изображений.
 * Дальнейшая работа окна (изменение src, link, name) будет реализовываться методами
 * созданного экземпляра
 */
const popupViewImage = new PopupWithImage('.popup_action_show-card');



const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
    'Content-Type': 'application/json; charset=UTF-8'
  }
});



const user = new UserInfo({
  nameElementSelector: '.profile__name',
  aboutElementSelector: '.profile__vocation',
  avatarSelector: '.profile__avatar'
});



const section = new Section( {
    renderer: (data) => {
        const card = getCardMarkup(data);
        section.addItemRevert(card.generate());
    }
}, '.elements');



Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userRes, cardsRes]) => {
        sessionStorage.setItem('user-data', JSON.stringify(userRes));
        user.renderData();
        section.renderItems(cardsRes);
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
        section.addItem(getCardMarkup(res).generate());
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


const popupRemoveCard = new PopupRemoveCard(
  '.popup_action_delete-confirmation',
  (cardData, evt) => {
    renderLoading(true, evt.submitter, 'Удалить', 'Удаление...');
    api.deleteCard(cardData._id)
      .then(res => {
        cardData.remove();
        popupRemoveCard.closePopup();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        renderLoading(false, evt.submitter, 'Удалить', 'Удаление...');
      })
  });
popupRemoveCard.setEventListeners();



/**
 * Создание экземпляра класса PopupWithForm для реализации логики
 * работы окна добавления редактиррования профиля
 */
const popupEditProfile = new PopupWithForm('.popup_action_edit-profile',
  (formData, evt) => {
    renderLoading(true, evt.submitter);
    api.updateUserInfo(formData)
      .then(res => {
        user.setUserInfo(res);
        popupEditProfile.closePopup();
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        renderLoading(false, evt.submitter)
      })
  });
popupEditProfile.setEventListeners();

editProfileButton.addEventListener('mousedown', () => {
  const userData = user.getUserInfo();
  profileNameInput.value = userData.name;
  profileAboutInput.value = userData.about;

  popupEditProfile.openPopup();
});


const popupChangeAvatar = new PopupWithForm('.popup_action_edit-avatar', (formData, evt) => {
  renderLoading(true, evt.submitter);
  api.updateAvatar(formData)
    .then(res => {
      user.setUserInfo(res);
      popupChangeAvatar.closePopup()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, evt.submitter)
    })
})
popupChangeAvatar.setEventListeners();

changeAvatarButton.addEventListener('click', () => {
  popupChangeAvatar.openPopup()
})


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


function getCardMarkup(cardData) {
  const card = new Card({
      data: cardData,
      handleCardClick: () => {
        popupViewImage.setEventListeners();
        popupViewImage.openPopup(cardData);
      },
      insertLike: () => {
        api.insertLike(cardData._id)
          .then(res => {
            card.toggleLike(res.likes);
          })
          .catch(err => {
            console.error(err);
          })
      },
      deleteLike: () => {
        api.deleteLike(cardData._id)
          .then(res => {
            card.toggleLike(res.likes);
          })
          .catch(err => {
            console.error(err);
          })
      },
      handleRemoveClick: () => {
        cardIdInput.value = cardData._id;
        popupRemoveCard.openPopup(card);
      }
    },
    '#card-template');
  return card;
}