const editPopup = document.querySelector('#edit-popup');
const addPopup = document.querySelector('#add-popup');
const imagePopup = document.querySelector('#image-popup');
const editCloseBtn = editPopup.querySelector('.popup__exit-button');
const addCloseBtn = addPopup.querySelector('.popup__exit-button');
const imageCloseBtn = imagePopup.querySelector('.popup__exit-button');
const profile = document.querySelector('.profile');
const editBtn = profile.querySelector('.profile__edit-button');
const addBtn = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const formEdit = editPopup.querySelector('.popup__form');
const inputName = formEdit.querySelector('.popup__input_type_name');
const inputJob = formEdit.querySelector('.popup__input_type_job');
const formAdd = addPopup.querySelector('.popup__form');
const inputPlace = formAdd.querySelector('.popup__input_type_place');
const inputImage = formAdd.querySelector('.popup__input_type_image');
const imageTitle = imagePopup.querySelector('.popup__image-title');
const imageSrc = imagePopup.querySelector('.popup__image');
const cardContainer = document.querySelector('.elements');


function  openEdit() {
    inputName.value = `${profileName.textContent}`;
    inputJob.value = `${profileJob.textContent}`;
    editPopup.classList.add('popup_opened');
}

function openAdd() {
    inputPlace.value = null;
    inputImage.value = null;
    addPopup.classList.add('popup_opened');
}

function  closeEdit() {
    editPopup.classList.remove('popup_opened');
}

function closeAdd() {
    addPopup.classList.remove('popup_opened');
}

function closeImage() {
    imagePopup.classList.remove('popup_opened');
}

function submitEdit(evt) {
    evt.preventDefault();
    const newName = inputName.value;
    const newJob = inputJob.value;
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    closeEdit();
}

function submitAdd(evt) {
    evt.preventDefault();
    addCard(inputPlace.value, inputImage.value);
    closeAdd();
}

function addCard(cardTitle, cardImage){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = cardTitle;
    cardElement.querySelector('.element__image').src = cardImage;
    cardElement.querySelector('.element__like-button').addEventListener('click', evt => {
        evt.target.classList.toggle('element__like-button_active')
    })
    cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
        cardElement.remove();
    })
    cardElement.querySelector('.element__image').addEventListener('click', () => {
        imagePopup.classList.add('popup_opened');
        imageTitle.textContent = cardTitle;
        imageSrc.src = cardImage;
    })
    console.log(cardElement);
    cardContainer.prepend(cardElement);
}

const initialCards = [
    {
        name: 'Кунгурская ледяная пещера',
        link: './images/kungur.jpg'
    },
    {
        name: 'гора Гамсутль',
        link: './images/gamsutl.jpg'
    },
    {
        name: 'город Болгар',
        link: './images/bolgar.jpg'
    },
    {
        name: 'Кезенойам',
        link: './images/kezenoyam.jpg'
    },
    {
        name: 'Берег Куршской Косы',
        link: './images/kurshskaya-kosa.jpg'
    },
    {
        name: 'Оймякон',
        link: './images/oymakon.jpg'
    }
];

initialCards.forEach(item => {
    addCard(item.name, item.link);
})

editBtn.addEventListener('click', openEdit);
addBtn.addEventListener('click', openAdd);

editCloseBtn.addEventListener('click', closeEdit);
addCloseBtn.addEventListener('click', closeAdd);
imageCloseBtn.addEventListener('click', closeImage);

formEdit.addEventListener('submit', submitEdit);
formAdd.addEventListener('submit', submitAdd);





