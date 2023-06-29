const profile = document.querySelector('.profile');
export const profileBtn = profile.querySelector('.profile__edit-button');
export const addingBtn = profile.querySelector('.profile__add-button');
const profileForm = document.forms["profile-form"];
export const inputName = profileForm.querySelector('.form__input_type_name');
export const inputJob = profileForm.querySelector('.form__input_type_job');
export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};
