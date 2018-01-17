import Handlebars from 'handlebars'

export default class Templating {

    constructor() {
        this._grabDom();
        this._addListener();
    }


    /* PRIVATE METHODS */

    _createBounds() {
        ['_prevent']
            .forEach((fn) => this[fn] = this[fn].bind(this));
    }


    _prevent(pEvt) {

        let cardsTemplate = document.querySelector('#cards-template').innerHTML;
        let cardsContainer = document.querySelector('.section-bottom__template');
        let compiledTemplate = Handlebars.compile(cardsTemplate);

        if (pEvt.keyCode === 13) {
            pEvt.preventDefault();
            let arr = [];
            let value = pEvt.target.value;
            arr.push(value);
            let req = new XMLHttpRequest();
            req.open('GET', 'http://joibor.fr/api/search.json', true);
            req.addEventListener('load', () => {
                if (req.status === 200 && req.readyState == 4) {
                    this._parsing = JSON.parse(req.responseText);
                }
            });
            req.send();
            for (let i = 0; i < this._parsing.listing.length; i++) {
                let generated = compiledTemplate(this._parsing.listing[i]);
                if (arr[0].toLowerCase() === this._parsing.listing[i].city.toLowerCase()) {
                    cardsContainer.innerHTML += generated
                }
            }
        } else {
            cardsContainer.innerHTML = ''
        }
    }

    /* END PRIVATE METHODS */

    /* PUBLIC METHODS */

    /* END PUBLIC METHODS */

    /* EVENT HANDLER */

    _addListener() {
        this._dom.searchInput.addEventListener('keypress', this._prevent)
    }

    /* END EVENT HANDLER */

    /* GRAB DOM */

    _grabDom() {
        this._dom = {};
        this._dom.cardsTemplate = document.querySelector('#cards-template').innerHTML;
        this._dom.cardsContainer = document.querySelector('.section-bottom__template');
        this._dom.searchInput = document.querySelector('.js-search-input');
    }

    /* END GRAB DOM*/
}