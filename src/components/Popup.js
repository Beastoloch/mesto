export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape'){
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if(evt.target.classList.contains('popup'))
        this.close();
    }

    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__exit-button');
        this._closeButton.addEventListener('click', () => this.close());
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        document.addEventListener('mousedown', this._handleOverlayClose.bind(this));
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        document.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
    }
}