const nameElement = document.querySelector('.profile__name');
const vocationElement = document.querySelector('.profile__vocation');
const editButton = document.querySelector('.btn_style_edit');
const popup = document.querySelector('.popup');

const closeButton = popup.querySelector('.popup__btn-close');
const submitButton = popup.querySelector('.btn_style_submit');
const nameField = popup.querySelector('#name');
const vocationField = popup.querySelector('#vocation');



function showPopup() {
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');
}



function hidePopup() {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
}



function submitFormHandler(evt) {
    evt.preventDefault();

    const nameValue = nameField.value;
    const vocationValue = vocationField.value;

    nameElement.textContent = nameValue;
    vocationElement.textContent = vocationValue;

    hidePopup();
}

editButton.addEventListener('click', function () {
    nameField.value = nameElement.textContent;
    vocationField.value = vocationElement.textContent;

    showPopup();
})

closeButton.addEventListener('click', hidePopup);
submitButton.addEventListener('click', submitFormHandler)


