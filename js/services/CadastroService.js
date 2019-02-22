/**
 * @name CadastroService
 * @description Responsavel em disponibilizar dados para o Controler CadastroController
 * @author Washington Developer
 */
class CadastroService {

    constructor() {
        this.contacts = JSON.parse(localStorage.getItem('contatos')) || []

    }

    addContato(contato) {
        let editandoContato = this.getContato(contato.id)
        if(editandoContato) {
            this.editingContato(editandoContato, contato)
        } else {

            this.contacts.push(contato)
            localStorage.removeItem('contatos')
            localStorage.setItem('contatos', JSON.stringify(this.contacts))
        }
    }

    cleanInputsForm(elements) {
        elements.forEach(element => element.value = '')
    }

    getContato(id) {
        return this.contacts.find(c => c.id == id ? c : undefined)
    }

    editingContato(editandoContato, contato) {
        let index = this.getIndexOfContato(editandoContato)
        this.contacts.splice(index, 1)

        if(!contato.img)
            contato.img = editandoContato.img
        
        this.contacts[index] = contato

        localStorage.removeItem('contatos')
        localStorage.setItem('contatos', JSON.stringify(this.contacts))
    }

    getIndexOfContato(contato) {
        let index = undefined
        this.contacts.forEach((c, i) => {
            if(c.id == contato.id) {
                index = i
            }
        })
        return index
    }

    
}
