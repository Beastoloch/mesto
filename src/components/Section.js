export default class Section {
    constructor({ renderer }, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  
    clear() {
      this._container.innerHTML = '';
    }
  
    renderItems(data) {
      this.clear();

      this._renderedItems = data;
      this._renderedItems.forEach(this._renderer);
    }
  }
  