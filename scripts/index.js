const popupProfile = document.querySelector('#edit-popup');
const popupAdding = document.querySelector('#add-popup');
const profile = document.querySelector('.profile');
const profileBtn = profile.querySelector('.profile__edit-button');
const addingBtn = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const formProfile = popupProfile.querySelector('.form');
const inputName = formProfile.querySelector('.form__input_type_name');
const inputJob = formProfile.querySelector('.form__input_type_job');
const formAdding = popupAdding.querySelector('.form');
const inputPlace = formAdding.querySelector('.form__input_type_place');
const inputImage = formAdding.querySelector('.form__input_type_image');
const cardContainer = document.querySelector('.elements');
import Card from './card.js';
import FormValidator from './FormValidator.js';

export const openPopup = (popup) => {
    document.addEventListener('keydown', setEscListener);
    document.addEventListener('mousedown', setOverlayListener);
    popup.classList.add('popup_opened');
}

// const openErrorCheck = (formElement) => {
//     if(formElement){
//         const inputList = Array.from(formElement.querySelectorAll('.form__input'));
//         inputList.forEach((inputElement) => {
//             hideInputError({inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active'},
//                 formElement, inputElement);
//             toggleButtonState({inactiveButtonClass: 'popup__save-button_inactive'}, inputList,
//                 formElement.querySelector('.popup__save-button'));
//         });
//     }
// }

const openEdit = () => {
    inputName.value = `${profileName.textContent}`;
    inputJob.value = `${profileJob.textContent}`;
    openPopup(popupProfile);
}

const openAdd = () => {
    formAdding.reset();
    openPopup(popupAdding);
}

const closePopup = (popup) => {
    const formCheck = popup.querySelector('.form');
    if (formCheck){
        Validation();
    }
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', setEscListener);
    document.removeEventListener('click', setOverlayListener);
}

const setEscListener = (evt) => {
    if(evt.key === 'Escape'){
        const popup =  document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

const setOverlayListener = (evt) => {
    if(evt.target.classList.contains('popup'))
        closePopup(evt.target.closest('.popup'));
}

const submitEdit = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupProfile);
}

const submitAdd = (evt) => {
    evt.preventDefault();
    const cardObj = { name: inputPlace.value, link: inputImage.value };
    renderCard(cardObj);
    closePopup(popupAdding);
}

const renderCard = (cardObj) => {
    const card = new Card(cardObj);;
    const cardElement = card.generateCard();
    cardContainer.prepend(cardElement);
}

// const createCard = (cardObj) => {
//     const cardTemplate = document.querySelector('#card-template').content;
//     const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
//     const cardImage = cardElement.querySelector('.element__image');
//     cardElement.querySelector('.element__title').textContent = cardObj.name;
//     cardImage.src = cardObj.link;
//     cardImage.alt = cardObj.name;
//     cardElement.querySelector('.element__like-button').addEventListener('click', evt => {
//         evt.target.classList.toggle('element__like-button_active')
//     })
//     cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
//         cardElement.remove();
//     })
//     cardElement.querySelector('.element__image').addEventListener('click', () => {
//         openPopup(popupImage);
//         imageTitle.textContent = cardObj.name;
//         imageSrc.src = cardObj.link;
//         imageSrc.alt = cardObj.name;
//     });
//     return cardElement;
// }

import {initialCards} from './initial-cards.js';
initialCards.forEach(item => {
    renderCard(item);
});

const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

const Validation = () =>{
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        validator.enableValidation();
    });
}

Validation();

profileBtn.addEventListener('click', openEdit);
addingBtn.addEventListener('click', openAdd);


document.querySelectorAll('.popup__exit-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
});

formProfile.addEventListener('submit', submitEdit);
formAdding.addEventListener('submit', submitAdd);





