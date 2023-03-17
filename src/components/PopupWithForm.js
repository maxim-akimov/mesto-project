import Popup from "./Popup";


export default class PopupWithForm extends Popup {
    constructor(selector, callbackSubmitForm) {
        super(selector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupForm = this._popup.querySelector('.form');
        this._inputList = this._popupForm.querySelectorAll('.form__input');
        this._saveButton = this._popupForm.querySelector('.btn')

    }
    _getInputsValue() {
        const formData = {}
        this._inputList.forEach(input => {
            formData[input.name] = input.value
        });
            return formData
        }

    
    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', evt => {
            evt.prevent.default();
            this._callbackSubmitForm(this._getInputsValue)
        })
    }
    closePopup() {
        super.closePopup();
        this._popupForm.reset()

    }

     renderLoading = (isLoading) => {
        if (isLoading) {
          this._saveButton.textContent = 'Сохранение...'
        } else {
          this._saveButton.textContent = 'Сохранить'
        }
      
      }
}