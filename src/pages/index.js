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

const submitEditForm = () => {
    const inputObj = editPopup.getValue();
    editPopup.renderLoading(true, submitBtnMessage);
    api.setUserInfo(inputObj['name'], inputObj['info'])
        .then((info) => {
            userInfo.setUserInfo(info.name, info.about);
            editPopup.close();
        })
        .catch(err => console.log(`Ошибка...: ${err}`))
        .finally(() => {
            editPopup.renderLoading(false);
        });
}

const submitAvatarForm = () => {
    const inputObj = avatarPopup.getValue();
    avatarPopup.renderLoading(true, submitBtnMessage);
    api.setUserAvatar(inputObj['avatar'])
        .then((info) => {
            userInfo.setUserAvatar(info.avatar);
            avatarPopup.close();
        })
        .catch(err => console.log(`Ошибка...: ${err}`))
        .finally(() => {
            avatarPopup.renderLoading(false);
        });
}

const submitCardForm = () => {
    const inputObj = addingPopup.getValue();
    addingPopup.renderLoading(true, submitBtnMessage);
    api.postNewCard(inputObj['place-input'], inputObj['image-input'])
        .then((info) => {
            renderCard(info);
            addingPopup.close();
        })
        .catch(err => console.log(`Ошибка...: ${err}`))
        .finally(() => {
            addingPopup.renderLoading(false);
        });
}

const deleteCard = (card, id) => {
    deletePopup.renderLoading(true, deleteBtnMessage);
    api.deleteCard(id)
        .then(() => {
            card.readyToDelete();
            deletePopup.close();
        })
        .catch(err => console.log(`Ошибка...: ${err}`))
        .finally(() => {
            deletePopup.renderLoading(false);
        });
}

const handleToggleLike = (card, id, isLiked) => {
    if (isLiked) {
        api.deleteLike(id)
            .then((info) => {
                card.readyToToggleLike(info);
            })
            .catch(err => console.log(`Ошибка...: ${err}`))
    }
    else {
        api.putLike(id)
            .then((info) => {
                card.readyToToggleLike(info);
            })
            .catch(err => console.log(`Ошибка...: ${err}`))
    }
}

const openEditPopup = () => {
    const newUserInfo = userInfo.getUserInfo();
    editPopup.setInputValues(newUserInfo);
    formValidators['profile-form'].resetValidation();
    editPopup.open();
}

const openAvatarPopup = () => {
    avatarPopup.open();
    formValidators['avatar-form'].resetValidation();
}

const openAddingPopup = () => {
    addingPopup.open();
    formValidators['adding-form'].resetValidation();
}

const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
}

const handleDeleteClick = (card, id) => {
    deletePopup.open(card, id);
}

const isBelongsToAcc = (profile) => {
    return (JSON.stringify(userLoadedInfo) === JSON.stringify(profile));
}

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const editPopup = new PopupWithForm('#edit-popup', submitEditForm);
editPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', submitAvatarForm);
avatarPopup.setEventListeners();

const addingPopup = new PopupWithForm('#add-popup', submitCardForm);
addingPopup.setEventListeners();

const deletePopup = new PopupWithDelete('#delete-popup', deleteCard);
deletePopup.setEventListeners();

const api = new Api(options);

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

let userLoadedInfo;
let cardsData;
const cardList = new Section({ renderer: renderCard }, '.elements');

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((values) => {
        [userLoadedInfo, cardsData] = values;
        userInfo.setUserInfo(userLoadedInfo.name, userLoadedInfo.about);
        userInfo.setUserAvatar(userLoadedInfo.avatar);

        cardList.renderItems(cardsData);
    })
    .catch((err)=>{
        console.log(`Ошибка...: ${err}`);
    })

const createCard = (cardObj) => {
    const card = new Card(cardObj, '#card-template', handleCardClick, handleDeleteClick, isBelongsToAcc, handleToggleLike);
    return card.generateCard();
}

avatarBtn.addEventListener('click', openAvatarPopup);
profileBtn.addEventListener('click', openEditPopup);
addingBtn.addEventListener('click', openAddingPopup);