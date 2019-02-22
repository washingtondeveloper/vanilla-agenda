/**
 * @name ContatosController
 * @description Responsavel em Controlar toda a pagina de Contatos
 * @author Washington Developer
 */
class ContatosController {

    constructor() {
        this.tbody = utils.selector.query('.table tbody')
        this.service = new ContatosService(this.tbody, this)
    }

    remove(id) {
        this.service.removeContato(id)
        
        this.service.showTable()
    }
}

/**
 * Função a ser chamada
 */
function contatos() {
    new ContatosController()
}
