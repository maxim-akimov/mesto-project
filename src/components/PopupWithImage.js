export default class PopupWithImage extends Popup {
  constructor(data, selector) {
    super(selector);

    this._src = data.link;
    this._name = data.name;

    this._popup = document.querySelector(this._selector);
  }



  open() {
    super.openPopup();

    this._popup.querySelector('.popup__image').src = this._src;
    this._popup.querySelector('.popup__figcaption').textContent = this.name;
  }
}