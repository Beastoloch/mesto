export default class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick, isBelongsToAcc, handleToggleLike) {
        this._title = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._isBelongsToAcc = isBelongsToAcc;
        this._handleImageClick = this._handleImageClick.bind(this);
        this._deleteCard = this._deleteCard.bind(this);
        this._toggleLike = this._toggleLike.bind(this);
        this._cardSelector = cardSelector;
        this._handleToggleLike = handleToggleLike;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    async _toggleLike() {
        this._likes = await this._handleToggleLike(this._id, this._likeButton.classList.contains('element__like-button_active'));
        this._likesCount.textContent = this._likes.likes.length;
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard(evt) {
        this._elementToDelete = evt.target.closest('.element');
        this._handleDeleteClick(this, this._id);
    }

    readyToDelete(){
        this._elementToDelete.remove();
    }

    _handleImageClick() {
        this._handleCardClick(this._title, this._image);
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__like-button');
        this._likeButton.addEventListener('click', this._toggleLike);
        this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', this._handleImageClick);
    }

    _handleMyLikes() {
        if(this._likes)
            this._likes.forEach((profile) => {
                if (this._isBelongsToAcc(profile))
                    this._toggleLike();
            })
    }

    _handleDeleteButton() {
        if(!this._isBelongsToAcc(this._owner)){
            this._element.querySelector('.element__delete-button').remove();
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');
        this._likesCount = this._element.querySelector('.element__like-count');
        this._setEventListeners();
        this._handleDeleteButton();
        this._handleMyLikes();

        this._likesCount.textContent = this._likes.length;
        this._cardTitle.textContent = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;

        return this._element;
    }
}