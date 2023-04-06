let popup = document.querySelector('.popup');
let closeBtn = popup.querySelector('.popup__exit-button');
let profile = document.querySelector('.profile');
let editBtn = profile.querySelector('.profile__edit-button');
let saveBtn = profile.querySelector('.popup__save-button');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let formElement = popup.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input_type_name');
let inputJob = formElement.querySelector('.popup__input_type_job');
let likeButtons = document.querySelectorAll('.element__like-button');

function  openEdit() {
    inputName.value = `${profileName.textContent}`;
    inputJob.value = `${profileJob.textContent}`;
    popup.classList.add('popup_status_opened');
}

editBtn.addEventListener('click', openEdit);

function  closeEdit() {
    popup.classList.remove('popup_status_opened');
}

closeBtn.addEventListener('click', closeEdit);

function submitEdit(evt) {
    evt.preventDefault();
    let newName = inputName.value;
    let newJob = inputJob.value;
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    closeEdit();
}

formElement.addEventListener('submit', submitEdit);


likeButtons.forEach(function (like){
    like.addEventListener('click', function () {
        like.classList.toggle('element__like-button_status_active');
    })
})






