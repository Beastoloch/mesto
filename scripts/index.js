const popupProfile = document.querySelector('#edit-popup');
const popupAdding = document.querySelector('#add-popup');
const profile = document.querySelector('.profile');
const profileBtn = profile.querySelector('.profile__edit-button');
const addingBtn = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileForm = document.forms["profile-form"];
const inputName = profileForm.querySelector('.form__input_type_name');
const inputJob = profileForm.querySelector('.form__input_type_job');
const addingForm = document.forms["adding-form"];
const inputPlace = addingForm.querySelector('.form__input_type_place');
const inputImage = addingForm.querySelector('.form__input_type_image');
const cardContainer = document.querySelector('.elements');
const popupImage = document.querySelector('#image-popup');
const imageTitle = popupImage.querySelector('.popup__image-title');
const imageSrc = popupImage.querySelector('.popup__image');
import Card from './card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-cards.js';

const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

const formValidators = {};

const enableValidation = (config) =>{
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
}

enableValidation(config);

export const openPopup = (popup) => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);
    popup.classList.add('popup_opened');
}

const openEdit = () => {
    inputName.value = `${profileName.textContent}`;
    inputJob.value = `${profileJob.textContent}`;
    formValidators['profile-form'].resetValidation();
    openPopup(popupProfile);
}

const openAdd = () => {
    openPopup(popupAdding);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('mousedown', handleOverlay);
}

export const handleCardClick = (name, link) => {
    imageTitle.textContent = name;
    imageSrc.src = link;
    imageSrc.alt = name;
    openPopup(popupImage);
}

const handleEscape = (evt) => {
    if(evt.key === 'Escape'){
        const popup =  document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

const handleOverlay = (evt) => {
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
    addingForm.reset();
    formValidators['adding-form'].resetValidation();
}

const renderCard = (cardObj) => {
    const cardElement = createCard(cardObj);
    cardContainer.prepend(cardElement);
}

const createCard = (cardObj) => {
    const card = new Card(cardObj, '#card-template', handleCardClick);;
    const cardElement = card.generateCard();
    return cardElement;
}

initialCards.forEach(renderCard);

profileBtn.addEventListener('click', openEdit);
addingBtn.addEventListener('click', openAdd);


document.querySelectorAll('.popup__exit-button').forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', submitEdit);
addingForm.addEventListener('submit', submitAdd);





