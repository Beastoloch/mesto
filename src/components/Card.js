export default class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
        this._title = data.name;
        this._image = data.link;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleImageClick = this._handleImageClick.bind(this);
        this._deleteCard = this._deleteCard.bind(this);
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('element__like-button_active');
    }

    _deleteCard(evt) {
        this._handleDeleteClick(evt.target.closest('.element'));
        // evt.target.closest('.element').remove();
    }

    _handleImageClick() {
        this._handleCardClick(this._title, this._image);
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', this._toggleLike);
        this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', this._handleImageClick);
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