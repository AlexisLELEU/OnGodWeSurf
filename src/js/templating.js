import Handlebars from 'handlebars'

export default class Templating {

    constructor() {
        this._grabDom();
        this._addListener();

        this._getData();
        this._putData();
    }


    /* PRIVATE METHODS */

    _createBounds() {
        ['_getData', '_putData']
            .forEach((fn) => this[fn] = this[fn].bind(this));
    }

    _putData () {
        for (let i = 0; i < this._parsing.search.length; i++) {
            let compiledTemplate = Handlebars.compile(this._dom.cardsTemplate);
            let generated = compiledTemplate(this._parsing.search[i]);
            this._dom.cardsContainer.innerHTML += generated
        }
    }

    _getData () {
        let req = new XMLHttpRequest();
        req.open('GET', 'http://joibor.fr/api/search.json', false);
        req.send(null);
        if (req.status === 200) {
            return this._parsing = JSON.parse(req.responseText);
        }
    }

    /* END PRIVATE METHODS */

    /* PUBLIC METHODS */

    /* END PUBLIC METHODS */

    /* EVENT HANDLER */

    _addListener() {

    }

    /* END EVENT HANDLER */

    /* GRAB DOM */

    _grabDom () {
        this._dom = {};
        this._dom.cardsTemplate = document.querySelector('#cards-template').innerHTML;
        this._dom.cardsContainer = document.querySelector('.section-bottom__template');
    }

    /* END GRAB DOM*/
}