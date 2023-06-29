import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
   }
   
   _getInputValues() {
        this._input = {};
        const inputList = Array.from(this._form.querySelectorAll('.form__input'));
        inputList.forEach(input => {
            const inputName = input.getAttribute('name');
            this._input[inputName] = input.value;
        })
   }

   getValue() {
        return this._input;
   }
   
   setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__exit-button');
        this._closeButton.addEventListener('click', () => this.close());
        this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._getInputValues();
            this._submitForm();
        });
   }
}