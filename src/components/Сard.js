export default class Card {
  constructor({ data, handleCardClick, insertLike, deleteLike, handleRemoveClick }, templateSelector) {
    ({
      _id: this._id,
      name: this._name,
      link: this._link,
      owner: this._owner,
      likes: this._likes
    } = data);

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._insertLike = insertLike;
    this._deleteLike = deleteLike;
    this._handleRemoveClick = handleRemoveClick;
    this._hasLike = false;
    this._user = JSON.parse(sessionStorage.getItem('user-data'));
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
    (!this._hasLike)
      ? this._insertLike()
      : this._deleteLike();
  }



  _checkRemovableState() {
    return this._owner._id === this._user._id;
  }



  _checkLikeState() {
    if (this._likes) {
      for (let i = 0; i < this._likes.length; i++) {
        if (this._user._id === this._likes[i]._id) {
          this._hasLike = true;
        }
      }
    }
  }



  toggleLike(likes) {
    this._element.querySelector('.btn_style_like').classList.toggle('btn_style_like-active');
    this._element.querySelector('.element__like-counter').textContent = likes.length;
    this._hasLike = !this._hasLike;
  }



  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    this._checkLikeState();

    this._element.setAttribute('data-card-id', this._id);
    this._element.querySelector('.element__heading').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._likes.length;

    const image = this._element.querySelector('.element__image');
    image.src = this._link;
    image.alt = this._name;

    if (!this._checkRemovableState()) {
      this._element.querySelector('.btn_style_delete').remove();
    }

    if (this._hasLike) {
      this._element.querySelector('.btn_style_like').classList.add('btn_style_like-active')
    }

    return this._element;
  }



  remove() {
    this._element.remove();
  }
}