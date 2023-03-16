export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    
    this._submitCallback = submitCallback;
    this._popup = document.querySelector(this._selector);
    this._form = this._popup.forms[0];
  }



  _getInputValues() {
    this._formData = {};
    this._inputsList = this._form.querySelectorAll('.form__input');

    this._inputsList.forEach(input => {
      this._formData[input.name] = input.value;
    })

    return this._formData;
  }



  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(evt);
    })
  }



  _close() {
    super._close();
    this._form.reset();
  }
}
