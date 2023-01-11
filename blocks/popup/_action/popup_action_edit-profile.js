const editButton = document.querySelector('.btn_style_edit');
const nameElement = document.querySelector('.profile__name');
const vocationElement = document.querySelector('.profile__vocation');
const formElement = document.querySelector('.form_action_profile-edit');
const nameField = formElement.querySelector('#name');
const vocationField = formElement.querySelector('#vocation');

function submitFormHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameField.value;
  vocationElement.textContent = vocationField.value;

  hidePopup(evt);
}

editButton.addEventListener('click', function () {
  nameField.value = nameElement.textContent;
  vocationField.value = vocationElement.textContent;
  
  showPopup('.popup_action_edit-profile');
})

formElement.addEventListener('submit', submitFormHandler)