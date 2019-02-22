/**
 * @name ContatosService
 * @description Resposavel em servir dados para ContatosController
 * @author Washington Developer
 */
class ContatosService {

    constructor(tbody) {
        this.tbody = tbody
        this.contacts = JSON.parse(localStorage.getItem('contatos')) || []
        this.pages = new Pages()

        this.showTable()
    }

    showTable() {
        this.tbody.innerHTML = ''

        if(this._isEmpty(this.contacts)) {
            this._showTableWithoutContatcts()
        } else {
            this._list()
            utils.selector.all('a[title=Excluir]').forEach(el => el.addEventListener('click', this.removeContato.bind(this)))
            utils.selector.all('a[title=Editar]').forEach(el => el.addEventListener('click', this.editContato.bind(this)))
        }

    }

    removeContato(event) {
        this.contacts = this.contacts.filter(c => c.id != event.target.parentElement.id)
        localStorage.removeItem('contatos')
        localStorage.setItem('contatos', JSON.stringify(this.contacts))

        utils.showMessage('Excluido com Sucesso!!!', 'INFO')

        this.showTable()
    }

    editContato(event) {
        const contatoFound = this.contacts.find(c => c.id == event.target.parentElement.id)
        this.pages.addPage('cadastro', function() {
            utils.selector.query('input[name="id"]').value = contatoFound.id
            utils.selector.query('input[name="name"]').value = contatoFound.name
            utils.selector.query('input[name="phone"]').value = contatoFound.phone
            utils.selector.query('input[name="email"]').value = contatoFound.email
            utils.selector.query('img[class=image-item]').src = contatoFound.img ? contatoFound.img : 'img/user.png'

            main.menu.activeItem('Cadastro')
        })
    }

    _list() {
        this.contacts.forEach((c, i) => {

            this.tbody.innerHTML += `
                <tr>
                    <td><img src="${c.img ? c.img : imageDefault}" /></td>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.phone}</td>
                    <td>${c.email}</td>
                    <td>
                        <a title="Editar" id="${c.id}" style="color: blue; cursor:pointer">
                            <i class="fas fa-user-edit"></i>
                        </a>
                        <a  title="Excluir" id="${c.id}" style="color: red; cursor:pointer">
                            <i class="fas fa-user-slash"></i>
                        </a>
                    </td>
                </tr>
            `
        })
    }

    _isEmpty(contacts) {
        return contacts.length === 0
    }

    _showTableWithoutContatcts() {
        this.tbody.innerHTML = `
            <tr>
                <td colspan="6">Não existe contato <strong>cadastrado</strong></td>
            </tr>
        `
    }
}
