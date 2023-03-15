export default class Card {
  constructor({data, handleCardClick}, templateSelector) {

      this._id = data._id;
      this._name = data.name;
      this._link = data.link;
      this._owner = data.owner;
      this._likes = data.likes;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._user = sessionStorage.getItem('user-data');
  }



  _getElement() {
    return document.querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }



  _setEventListeners() {
    this._element.querySelector('.btn_style_like')
      .addEventListener('mousedown', () => {
        this._handleLikeClick();
      })

      this._element.querySelector('.element__image')
      .addEventListener('mousedown', () => {
        this._handleCardClick();
      })

      this._element.querySelector('.btn_style_delete')
      .addEventListener('mousedown', () => {
        this._handleRemoveClick();
      })
  }



  _handleLikeClick() {
    this._element.querySelector('.btn_style_like')
      .classList.toggle('btn_style_like-active');
      //TODO: запрос к серверу???
  }



  _checkRemovableState() {
    return this._owner._id === this._user._id;
  }



  _checkLikeState() {
    if(this._likes) {
      for(let i = 0; i < this._likes.length; i++ ) {
        if(this._user._id === this._likes[i]._id) {
            return true;
        }
      }
    }
    return false;
  }



  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.setAttribute('data-card-id', this._id);
    this._element.querySelector('.element__heading').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._likes.length;

    const image = this._element.querySelector('.element__image');
    image.src = this._link;
    image.alt = this._name;

    if(!this._checkRemovableState) {
        this._element.querySelector('.btn_style_delete').remove();
    }

    return this._element;
/*
    if(checkLikeState) {
        cardElement.querySelector('.btn_style_like').classList.add('btn_style_like-active')
    }
  */
  }
}