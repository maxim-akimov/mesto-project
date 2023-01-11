const addButton = document.querySelector('.btn_style_add');
const formAddCardElement = document.querySelector('.form_action_add-card');

function submitAddCardFormHandler(evt) {
  evt.preventDefault();
  const nameAddCardField = formAddCardElement.querySelector('#place-name');
  const linkAddCardField = formAddCardElement.querySelector('#place-link');

  if(nameAddCardField.value && linkAddCardField.value) {
    const card = cardBuilder(nameAddCardField.value, linkAddCardField.value)
    cardInsert(card);

    hidePopup(evt);

    nameAddCardField.value = '';
    linkAddCardField.value = '';
  }
}

addButton.addEventListener('click', function () {
  showPopup('.popup_action_add-card');
})

formAddCardElement.addEventListener('submit', submitAddCardFormHandler)