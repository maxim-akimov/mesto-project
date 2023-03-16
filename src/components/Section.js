import Api from 'Api1.js'
import Card from 'Card1.js'


export class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector)
        

    }
    addItem(el) {
        this._container.append(el)

    }
    renderItems() {
        this._items.forEach(item => {
            this._renderer(item)
        })

    }
}