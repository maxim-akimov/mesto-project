


export default class FormValidator{

    constructor(settings, formEl){
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonSelector = settings.inactiveButtonSelector;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        

        this._formEl = formEl;
        this._btnElement = this._formEl.querySelector(this._submitButtonSelector);
       
        
        

        this.btnElement = this._formEl.querySelector(this._submitButtonSelector);

        this._formEl = formEl


    }
    


    enableValidation(){
        this._setEventListeners()
    }



    _setEventListeners() {
        this._inputsList = this._formEl.querySelectorAll(this._inputSelector)

        console.log(this._inputsList)

        this._formEl.addEventListener('reset', () => {
            this._blockSubmitButton();
        })
    
        this._inputsList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid();

            })
        })
     
    
       
    }
        


    _blockSubmitButton() {
        if(!this._btnElement.classList.contains('btn_not-block')) {

            this._btnElement.classList.add(this._inactiveButtonSelector);

            this._btnElement.classList.add(this._inactiveButtonClass);

        }
        this._btnElement.disabled = true;
    }



    _activateSubmitButton() {

        this._btnElement.classList.remove(this._inactiveButtonSelector);

        this._btnElement.classList.remove(this._inactiveButtonClass);

        this._btnElement.disabled = false;
    }



    _isValid() {
        const inputElement = this._formEl.querySelector('.form__input');
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }
    
        if (!inputElement.validity.valid) {

            this._showInputError(inputElement, inputElement.validationMessage);
            this._blockSubmitButton();
        } else {
            this._hideInputError(inputElement);
            this._activateSubmitButton();
        }
      
    }




    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    }

    _showInputError(inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);


        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(`${this._errorClass}_visible`);
        errorElement.textContent = errorMessage;
    }



    _hideInputError(inputElement) {

        const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(`${this._errorClass}_visible`);
        errorElement.textContent = '';
    }
}