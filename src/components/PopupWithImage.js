import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageTitle = this._popup.querySelector('.popup__image-title');
        this._imageSrc = this._popup.querySelector('.popup__image');
    }

    open(name, link) {
        this._imageTitle.textContent = name;
        this._imageSrc.src = link;
        this._imageSrc.alt = name;
        super.open();
    }
}