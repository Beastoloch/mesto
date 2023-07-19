import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, deleteCard) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__admit-button');
        this._deleteCard = deleteCard;
    }

    open(evt) {
        this._evt = evt;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._deleteCard(this._evt);
        })
    }
}