const profile = document.querySelector('.profile');
export const profileBtn = profile.querySelector('.profile__edit-button');
export const addingBtn = profile.querySelector('.profile__add-button');
export const avatarBtn = profile.querySelector('.profile__avatar-edit');
export const submitBtnMessage = 'Сохранение...';
export const deleteBtnMessage = 'Удаление...';
export const options = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '326ea589-4f82-4ea1-88c2-8d864e356042',
        'Content-Type': 'application/json'
    }
}
export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__admit-button',
    inactiveButtonClass: 'popup__admit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};
