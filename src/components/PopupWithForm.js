import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
   }
   
   _getInputValues() {
        this._input = {};
        this._inputList.forEach(input => {
            const inputName = input.getAttribute('name');
            this._input[inputName] = input.value;
        })
   }

   close() {
     super.close();
     this._form.reset();
   }

   setInputValues(data) {
          this._inputList.forEach((input) => {
               input.value = data[input.name];
          });
   }

   getValue() {
        return this._input;
   }

   setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._getInputValues();
            this._submitForm();
        });
   }
}