const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
    console.log(inputElement);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
};

const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)){
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

const checkInputValidity = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
};

const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(config, formElement, inputElement);
            toggleButtonState(config, inputList, buttonElement);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(config, formElement);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});


