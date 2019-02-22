const imageDefault = '../img/user.png'
/**
 * @name Main
 * @description Responsavel em fazer o Boot da Aplicação
 * @author Washington Developer
 */
class Main {
    constructor() {
        this.menu = new Menu()
        this.pages = new Pages()
    }
}

/**
 * @name Menu
 * @description Responsavel no gerenciamento do Menu
 * @author Washington Developer
 */
class Menu {
    constructor() {
        this.items = utils.selector.all('.bar-item')
        this.itemDefault = undefined
        this.pages = new Pages()

        this.items.forEach(item => item.addEventListener('click', this._click.bind(this)))
        this.menuBar = utils.selector.query('.menu-bar').addEventListener('click', this.menuBarClicked.bind(this))
    }

    _click(event){
        this.itemDefault = event.target.innerText
        let textItemLowerCase = this.itemDefault.toLowerCase()

        this.activeItem(this.itemDefault)
        this.pages.addPage(textItemLowerCase)
    }

    activeItem(textItem) {
        this.items.forEach(item => {
            item.classList.remove('active')
            if(item.innerText === textItem) item.classList.add('active')
        })
    }

    menuBarClicked(event) {
        event.target.classList.toggle('active-menu-bar')
        utils.selector.query('.nav-bar-second')
            .classList.toggle('nav-bar-second-show')
    }
}

/**
 * @name Pages
 * @description Responsavel em fazer a administração das paginas.
 * @author Washington Developer
 */
class Pages {

    constructor() {
        this.main = utils.selector.query('.main')
    }

    addPage(textItemLowerCase, cb) {
        utils.pages(textItemLowerCase)
            .then(html => {
                this.main.innerHTML = html
                eval(textItemLowerCase+'()')
                if(cb) cb()
            })
            .catch(error => {
                console.error(error)
            })
    }
}

const main = new Main()
main.menu.activeItem('Contatos')
main.pages.addPage('contatos')

window.onload = function () {
    utils.selector.id('date')
        .innerText = new Date().getFullYear();
}

