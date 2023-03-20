export const addCardButton = document.querySelector('.btn_style_add');
export const editProfileButton = document.querySelector('.btn_style_edit');
export const forms = document.forms;
export const changeAvatarButton = document.querySelector('.profile__avatar-wrap')

export const profileNameInput = document.forms.profileEdit.elements.profileName;
export const profileAboutInput = document.forms.profileEdit.elements.profileVocation;
export const profileAvatarInput = document.forms.editAvatar.elements.avatarLink;
export const cardIdInput = document.forms.cardDelete.elements.cardId



export function renderLoading (isLoading, btnElement) {
    if (isLoading) {
        btnElement.textContent = 'Сохранение...'
    } else {
        btnElement.textContent = 'Сохранить'
    }
}