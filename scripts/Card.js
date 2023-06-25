export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
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
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');
        this._setEventListeners();
        
        this._cardTitle.textContent = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;

        return this._element;
    }
}