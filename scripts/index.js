const popupProfile = document.querySelector('#edit-popup');
const popupAdding = document.querySelector('#add-popup');
const popupImage = document.querySelector('#image-popup');
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
const imageTitle = popupImage.querySelector('.popup__image-title');
const imageSrc = popupImage.querySelector('.popup__image');
const cardContainer = document.querySelector('.elements');

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const  openEdit = () => {
    inputName.value = `${profileName.textContent}`;
    inputJob.value = `${profileJob.textContent}`;
    const formElement = popupProfile.querySelector('.form');
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    inputList.forEach((inputElement) => {
        if(inputElement.value){
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, formElement.querySelector('.popup__save-button'));
        }
    });
    openPopup(popupProfile);
}

const openAdd = () => {
    formAdding.reset();
    openPopup(popupAdding);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
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
    const cardElement = createCard(cardObj);
    cardContainer.prepend(cardElement);
}

const createCard = (cardObj) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    cardElement.querySelector('.element__title').textContent = cardObj.name;
    cardImage.src = cardObj.link;
    cardImage.alt = cardObj.name;
    cardElement.querySelector('.element__like-button').addEventListener('click', evt => {
        evt.target.classList.toggle('element__like-button_active')
    })
    cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
        cardElement.remove();
    })
    cardElement.querySelector('.element__image').addEventListener('click', () => {
        openPopup(popupImage);
        imageTitle.textContent = cardObj.name;
        imageSrc.src = cardObj.link;
        imageSrc.alt = cardObj.name;
    })
    return cardElement;
}

initialCards.forEach(item => {
    renderCard(item);
})

profileBtn.addEventListener('click', openEdit);
addingBtn.addEventListener('click', openAdd);

const popupList = Array.from(document.querySelectorAll('.popup'));
document.addEventListener('keydown', evt => {
    console.log(evt.key);
    popupList.forEach(popup => {
        if(popup.classList.contains('popup_opened') && evt.key === 'Escape')
            closePopup(popup);
    })
})

document.addEventListener('click', evt => {
    const popupContainerClosest = evt.target.closest('.popup__container');
    const popupClosest = evt.target.closest('.popup');
    if(!popupContainerClosest && popupClosest)
        closePopup(popupClosest);
})

document.querySelectorAll('.popup__exit-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
});

formProfile.addEventListener('submit', submitEdit);
formAdding.addEventListener('submit', submitAdd);





