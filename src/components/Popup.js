export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }



  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
  }



  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
  }



  _handleClose(evt) {
    if (evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__btn-close')) {
        this.close();
    }
  }



  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }



  setEventListeners() {
    this._popup.addEventListener('mouseup', (evt) => {
      this._handleClose(evt);
    })
  }
}