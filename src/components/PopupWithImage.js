import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    open(name, link) {
        this._imageTitle = this._popup.querySelector('.popup__image-title');
        this._imageSrc = this._popup.querySelector('.popup__image');
        this._imageTitle.textContent = name;
        this._imageSrc.src = link;
        this._imageSrc.alt = name;
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        document.addEventListener('mousedown', this._handleOverlayClose);
        this._popup.classList.add('popup_opened');
    }
}