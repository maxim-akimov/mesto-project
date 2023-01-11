function showPopup(selector) {
    const popup = document.querySelector(selector);
    const closeButton = popup.querySelector('.popup__btn-close');

    popup.classList.remove('popup_state_closed');
    popup.classList.add('popup_state_opened');

    closeButton.addEventListener('click', hidePopup);
}

function hidePopup(evt) {
    const popup = evt.target.closest('.popup');
    
    popup.classList.remove('popup_state_opened');
    popup.classList.add('popup_state_closed');
}



