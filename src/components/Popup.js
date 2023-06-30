export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
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
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('mousedown', this._handleOverlayClose);
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._handleOverlayClose);
    }
}