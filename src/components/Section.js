export default class Section {
    constructor({renderer}, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }



    addItem(el) {
        this._container.prepend(el)
    }



    addItemRevert(el) {
        this._container.append(el)
    }



    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }

}