import './styles/index.css';
import { renderLoading,
    addCardButton,
    editProfileButton,
    cardIdInput,
    forms,
    changeAvatarButton,
    profileNameInput,
    profileAboutInput,
    profileAvatarInput } from "./components/utils";
import Api from './components/Api';
import UserInfo from './components/UserInfo';
import Card from './components/Сard';
import Section from './components/Section';
import FormValidator from './components/FormValidator';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';



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



Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userRes, cardsRes]) => {
        sessionStorage.setItem('user-data', JSON.stringify(userRes));
        user.renderData();

        const section = new Section({
                items: cardsRes,
                renderer: (cardItem) => {
                    const card = new Card({
                            data: cardItem,
                            handleCardClick: () => {
                                popupViewImage.setEventListeners();
                                popupViewImage.openPopup(cardItem);
                            },
                            insertLike: () => {
                                return api.insertLike(cardItem._id)
                                    .catch(err => {
                                        console.error(err);
                                    })
                            },
                            deleteLike: () => {
                                return api.deleteLike(cardItem._id)
                                    .catch(err => {
                                        console.error(err);
                                    })
                            },
                            handleRemoveClick: () => {
                                cardIdInput.value = cardItem._id;
                                popupRemoveCard.openPopup();
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
                        popupViewImage.openPopup();
                    },
                    insertLike: () => {
                        return api.insertLike(res._id)
                            .catch(err => {
                                console.error(err);
                            })
                    },
                    deleteLike: () => {
                        return api.deleteLike(res._id)
                            .catch(err => {
                                console.error(err);
                            })
                    },
                    handleRemoveClick: () => {
                        cardIdInput.value = res._id;
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



const popupRemoveCard = new PopupWithForm(
    '.popup_action_delete-confirmation',
    (formData, evt) => {
        console.log(formData)
        renderLoading(true, evt.submitter, 'Удалить', 'Удаление...');
        console.log(formData.cardId)
        api.deleteCard(formData.cardId)
            .then(res => {
                document.querySelector(`[data-card-id="${formData.cardId}"]`).remove();
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
 * работы окна добавления карточки
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
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, evt.submitter)
  })
});
popupEditProfile.setEventListeners();
editProfileButton.addEventListener('mousedown', () => {
  const userData = JSON.parse(sessionStorage.getItem('user-data'));
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
  const userData = JSON.parse(sessionStorage.getItem('user-data'));
  profileAvatarInput.value = userData.avatar;
  popupChangeAvatar.openPopup()
})

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