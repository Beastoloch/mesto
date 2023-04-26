const popupProfile = document.querySelector('#edit-popup');
const popupAdding = document.querySelector('#add-popup');
const popupImage = document.querySelector('#image-popup');
const closeBtnProfile = popupProfile.querySelector('.popup__exit-button');
const closeBtnAdding = popupAdding.querySelector('.popup__exit-button');
const closeBtnImage = popupImage.querySelector('.popup__exit-button');
const profile = document.querySelector('.profile');
const profileBtn = profile.querySelector('.profile__edit-button');
const addingBtn = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const formProfile = popupProfile.querySelector('.popup__form');
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputJob = formProfile.querySelector('.popup__input_type_job');
const formAdding = popupAdding.querySelector('.popup__form');
const inputPlace = formAdding.querySelector('.popup__input_type_place');
const inputImage = formAdding.querySelector('.popup__input_type_image');
const imageTitle = popupImage.querySelector('.popup__image-title');
const imageSrc = popupImage.querySelector('.popup__image');
const cardContainer = document.querySelector('.elements');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function  openEdit() {
    inputName.value = `${profileName.textContent}`;
    inputJob.value = `${profileJob.textContent}`;
    openPopup(popupProfile);
}

function openAdd() {
    formAdding.reset();
    openPopup(popupAdding);
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
}

function  closeEdit() {
    closePopup(popupProfile);
}

function closeAdd() {
    closePopup(popupAdding);
}

function closeImage() {
    closePopup(popupImage);
}

function submitEdit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupProfile);
}

function submitAdd(evt) {
    evt.preventDefault();
    const cardObj = { name: inputPlace.value, link: inputImage.value };
    renderCard(cardObj);
    closePopup(popupAdding);
}

function renderCard(cardObj){
    const cardElement = createCard(cardObj);
    cardContainer.prepend(cardElement);
}

function createCard(cardObj){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    cardElement.querySelector('.element__title').textContent = cardObj.name;
    cardImage.src = cardObj.link;
    cardImage.alt = cardObj.title;
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
        imageSrc.alt = cardObj.title;
    })
    return cardElement;
}


initialCards.forEach(item => {
    renderCard(item);
})

profileBtn.addEventListener('click', openEdit);
addingBtn.addEventListener('click', openAdd);

closeBtnProfile.addEventListener('click', closeEdit);
closeBtnAdding.addEventListener('click', closeAdd);
closeBtnImage.addEventListener('click', closeImage);

formProfile.addEventListener('submit', submitEdit);
formAdding.addEventListener('submit', submitAdd);





