export default class FormValidator {
    constructor(config, formElement) {
        this._config = Object.assign({}, config);
        this._formElement = formElement;
    }
    
    _setEventListeners(){
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
            inputElement.addEventListener('mouseover', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement){
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._config.errorClass);
    };
    
    _hideInputError(inputElement){
        inputElement.classList.remove(this._config.inputErrorClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._config.errorClass);
    };

    _toggleButtonState(){
        if (this._hasInvalidInput()){
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _hasInvalidInput(){
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    enableValidation(){
        this._setEventListeners();
    };
}