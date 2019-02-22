/**
 * @author Washington Developer
 * @description Responsavel em fazer uma Seleção de um elemento
 */
class Selector {

    static id(id) {
        return document.getElementById(id)
    }

    static all(element) {
        return document.querySelectorAll(element)
    }

    static query(element) {
        return document.querySelector(element)
    }
}

/**
 * @name Creator
 * @author Washington
 * @description Responsavel em Criar elementos no DOM
 */
class Creator {

    static element(element) {
        return document.createElement(element)
    }
}

/**
 * @name Utils
 * @author Washington Developer
 * @description Agrupador de ferramentas
 */
class Utils {
    constructor() {
        this.selector = Selector
        this.creator = Creator

        this.container = this.selector.query('.container-message')
    }

    transformFirstLetterUpperCase(value) {
        return value[0].toUpperCase() + value.substring(1)
    }

    typeMessage(type) {
        switch(type) {
            case 'ERROR':
                return 'message-error'
            case 'INFO':
                return 'message-info'
            default:
                return 'message-success'
        }
    }
    
    showMessage(message, type) {

        const that = this

        const msg = Creator.element('div')

        msg.classList.add('message')
        msg.classList.add(that.typeMessage(type))
        msg.innerHTML = message
        msg.style.visibility = 'visible'

        that.container.appendChild(msg)
    
        setTimeout(() => {
            msg.classList.remove(that.typeMessage(type))
            msg.style.visibility = 'hidden'
            that.container.removeChild(msg)
        }, 3000)
    }

    pages(page) {
        return new Promise(function(resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(xhttp.responseText)
                }
            }
    
            xhttp.open("GET", `views/${page}.html`, true)
            xhttp.send()
        })
    }

    cleanMsgErrorInput() {
        const inputs = utils.selector.all('input[type="text"]')
        inputs.forEach(input => input.classList.remove('input-error'))
    }
}

/**
 * Instanciando Utils
 */
const utils = new Utils()
