import { 
    profileBtn,
    addingBtn,
    avatarBtn,
    config,
    submitBtnMessage,
    deleteBtnMessage,
    options
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
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

const submitEdit = async () => {
    const inputObj = editPopup.getValue();
    editPopup.renderLoading(true, submitBtnMessage);
    await api.setUserInfo(inputObj['name'], inputObj['info']);
    userInfo.setUserInfo(inputObj['name'], inputObj['info']);
    editPopup.renderLoading(false);
    editPopup.close();
}

const submitAvatar = async () => {
    const inputObj = avatarPopup.getValue();
    avatarPopup.renderLoading(true, submitBtnMessage);
    await api.setUserAvatar(inputObj['avatar']);
    userInfo.setUserAvatar(inputObj['avatar']);
    avatarPopup.renderLoading(false);
    avatarPopup.close();
}

const submitAdd = async () => {
    const inputObj = addPopup.getValue();
    addPopup.renderLoading(true, submitBtnMessage);
    const cardObj = await api.postNewCard(inputObj['place-input'], inputObj['image-input']);
    renderCard(cardObj);
    addPopup.renderLoading(false);
    addPopup.close();
}

const deleteCard = async (evt, id) => {
    deletePopup.renderLoading(true, deleteBtnMessage);
    await api.deleteCard(id);
    evt.remove();
    deletePopup.renderLoading(false);
    deletePopup.close();
}

const handleToggleLike = async (id, isLiked) => {
    if (isLiked)
        return await api.deleteLike(id);
    else
        return await api.putLike(id);
}

const openEdit = () => {
    const newUserInfo = userInfo.getUserInfo();
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

const handleDeleteClick = (evt, id) => {
    deletePopup.open(evt, id);
}

const isBelongsToAcc = (profile) => {
    return (JSON.stringify(userLoadedInfo) === JSON.stringify(profile));
}

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

const api = new Api(options);

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

const userLoadedInfo = await api.getUserInfo();
userInfo.setUserInfo(userLoadedInfo.name, userLoadedInfo.about);
userInfo.setUserAvatar(userLoadedInfo.avatar);

const createCard = (cardObj) => {
    const card = new Card(cardObj, '#card-template', handleCardClick, handleDeleteClick, isBelongsToAcc, handleToggleLike);
    const cardElement = card.generateCard();
    return cardElement;
}


const cardList = new Section({data: await api.getInitialCards(), renderer: renderCard}, '.elements');
cardList.renderItems();

avatarBtn.addEventListener('click', openAvatar);
profileBtn.addEventListener('click', openEdit);
addingBtn.addEventListener('click', openAdd);