import Popup  from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
        
    }

   openPopup(image) {
    super.openPopup();
    this._popupImage.src = image.link;
    this._popupImage.alt = image.name;
    this._popupFigcaption.textContent = image.name;

   }

}