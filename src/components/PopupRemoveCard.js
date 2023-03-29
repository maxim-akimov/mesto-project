import Popup from "./Popup";
export default class PopupRemoveCard extends Popup {
    constructor(selector, callbackSubmitForm) {
        super(selector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupForm = this._popup.querySelector('.form');
        this._instanceCard;
    }



    openPopup(instanceCard) {
        super.openPopup();
        this._instanceCard = instanceCard;
    }


    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', evt => {
            evt.preventDefault();
            this._callbackSubmitForm(this._instanceCard, evt)
        })
    }
}