const popupImage = document.querySelector('#image-popup');
const imageTitle = popupImage.querySelector('.popup__image-title');
const imageSrc = popupImage.querySelector('.popup__image');
import {openPopup} from './index.js';

export default class Card {
    constructor(data) {
        this._title = data.name;
        this._image = data.link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('#card-template')
            .content
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', evt => {
            evt.target.classList.toggle('element__like-button_active');
        });
        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
            evt.target.parentNode.remove();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            imageTitle.textContent = this._title;
            imageSrc.src = this._image;
            imageSrc.alt = this._title;
            openPopup(popupImage);
        });
    }

    _handleOpenPopup() {
        document.addEventListener('keydown', setEscListener);
        document.addEventListener('mousedown', setOverlayListener);
        popupImage.classList.add('popup_opened');
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__image').src = this._image;

        return this._element;
    }
}