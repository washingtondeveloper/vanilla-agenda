'use strict'
/**
 * @name CadastroController
 * @description Responsavel em fazer o Controle da Pagina de Cadastro
 * @author Washington Developer
 */
class CadastroController {

    constructor() {
        this.contato = {}
        this.camposInvalidos = []
        this.id = 0
        this.service = new CadastroService()

        this.containerImage = utils.selector.query('.image')
        this.img            = this.containerImage.children[0]
        this.button         = utils.selector.query('#btn-cadastro')
        this.inputId        = utils.selector.query('input[name="id"]')
        this.inputName      = utils.selector.query('input[name="name"]')
        this.inputEmail     = utils.selector.query('input[name="email"]')
        this.inputPhone     = utils.selector.query('input[name="phone"]')
        this.imageDefault   = 'img/user.png'

        this.containerImage.addEventListener('click', this._clickInputFile.bind(this)) 
        this.button.addEventListener('click', this.cadastrar.bind(this))
    }

    _clickInputFile(event) {
        const file = utils.selector.id('file')
        file.click()

        file.addEventListener('change', this._changeImage.bind(this))
    }

    _changeImage(event) {
        const file = event.target.files[0]

        const that = this

        const fileReader = new FileReader()

        fileReader.onload = function(e) {
            that.img.src = e.target.result
            that.contato.img = e.target.result
        }

        fileReader.readAsDataURL(file)
    }

    cadastrar(event) {
        event.preventDefault()
        utils.cleanMsgErrorInput()

        if(!this._validarForm()) {
            this.camposInvalidos.forEach(c => {
                utils.showMessage(`${c.getAttribute('placeholder')} é Obrigatório`, 'ERROR')
                c.classList.add('input-error')
            })
            this.camposInvalidos = []
            return
        }

        this.contato.id =  this.inputId.value
        this.contato.name = this.inputName.value
        this.contato.phone = this.inputPhone.value
        this.contato.email = this.inputEmail.value

        this.service.addContato(this.contato)
        utils.showMessage('Cadastrado com Sucesso!!!', 'SUCCESS')

        this.service.cleanInputsForm([this.inputEmail, this.inputName, this.inputPhone])
        this.img.src = this.imageDefault
        this.contato = {}
    }

    _validarForm() {
        const inputs = utils.selector.all('input[placeholder]')
        let validado = true
        inputs.forEach(input => {
            if(input.value.length < 3){
                this.camposInvalidos.push(input)
                validado = false
            }
                
        } )
        return validado
    }

}

function cadastro() {
    new CadastroController()
}
