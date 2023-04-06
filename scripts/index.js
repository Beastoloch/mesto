let popup = document.querySelector('.popup');
let closeBtn = popup.querySelector('.popup__exit-button');
let profile = document.querySelector('.profile');
let editBtn = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let formElement = popup.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input_type_name');
let inputJob = formElement.querySelector('.popup__input_type_job');

function  openEdit() {
    inputName.value = `${profileName.textContent}`;
    inputJob.value = `${profileJob.textContent}`;
    popup.classList.add('popup_opened');
}

function  closeEdit() {
    popup.classList.remove('popup_opened');
}

function submitEdit(evt) {
    evt.preventDefault();
    let newName = inputName.value;
    let newJob = inputJob.value;
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    closeEdit();
}

editBtn.addEventListener('click', openEdit);
closeBtn.addEventListener('click', closeEdit);
formElement.addEventListener('submit', submitEdit);






