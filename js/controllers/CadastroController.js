class CadastroService {

    constructor() {
        this.contacts = JSON.parse(localStorage.getItem('contatos')) || []
        this.id = 0
    }

    addContato(contato) {

        if(contato.id) {
            this.editingContato(contato)
            return
        }

        if(!contato.id) {
            
            contato.id = this.contacts.length + 1        

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

    editingContato(contato) {
        let index = this.getIndexOfContato(contato)
        console.log(index)
        if(!contato.img)
            contato.img = this.getContato(contato.id).img
        
        this.contacts.splice(index, 1, contato)

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
