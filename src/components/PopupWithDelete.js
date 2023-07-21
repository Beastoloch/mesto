import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, deleteCard) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__admit-button');
        this._origButtonMessage = this._button.textContent;
        this._origButtonMessage = this._button.textContent;
        this._deleteCard = deleteCard;
    }

    renderLoading(isLoading, message) {
        if(isLoading)
            this._button.textContent = message;
        else
            this._button.textContent = this._origButtonMessage;
    }

    open(evt, id) {
        this._evt = evt;
        this._id = id
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._deleteCard(this._evt, this._id);
        })
    }
}