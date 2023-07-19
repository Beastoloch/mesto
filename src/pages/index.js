import { 
    profileBtn,
    addingBtn,
    avatarBtn,
    config 
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../utils/initial-cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../styles/index.css';
import PopupWithDelete from "../components/PopupWithDelete";

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

const renderCard = (cardObj) => {
    const cardElement = createCard(cardObj);
    cardList.addItem(cardElement);
}

const submitEdit = () => {
    const inputObj = editPopup.getValue();
    userInfo.setUserInfo(inputObj['name'], inputObj['info']);
    editPopup.close();
}

const submitAvatar = () => {
    const inputObj = avatarPopup.getValue();
    userInfo.setUserAvatar(inputObj['avatar']);
    avatarPopup.close();
}

const submitAdd = () => {
    const inputObj = addPopup.getValue();
    renderCard({ name: inputObj['place-input'], link: inputObj['image-input'] });
    addPopup.close();
}

const deleteCard = (evt) => {
    evt.remove();
    deletePopup.close();
}

const openEdit = () => {
    const newUserInfo = userInfo.getUserInfo();
    console.log(newUserInfo);
    editPopup.setInputValues(newUserInfo);
    formValidators['profile-form'].resetValidation();
    editPopup.open();
}

const openAvatar = () => {
    avatarPopup.open();
    formValidators['avatar-form'].resetValidation();
}

const openAdd = () => {
    addPopup.open();
    formValidators['adding-form'].resetValidation();
}

const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
}

const handleDeleteClick = (evt) => {
    deletePopup.open(evt);
}

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const editPopup = new PopupWithForm('#edit-popup', submitEdit);
editPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', submitAvatar);
avatarPopup.setEventListeners();

const addPopup = new PopupWithForm('#add-popup', submitAdd);
addPopup.setEventListeners();

const deletePopup = new PopupWithDelete('#delete-popup', deleteCard);
deletePopup.setEventListeners();

const createCard = (cardObj) => {
    const card = new Card(cardObj, '#card-template', handleCardClick, handleDeleteClick);
    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({data: initialCards, renderer: renderCard}, '.elements'); 
cardList.renderItems();

avatarBtn.addEventListener('click', openAvatar);
profileBtn.addEventListener('click', openEdit);
addingBtn.addEventListener('click', openAdd);