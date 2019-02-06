let tbody

function contatos() {

    tbody = SELETOR('.table tbody')

    contatosService(tbody)
}

function remove(id) {
   removeContato(id)
   showMessage('Excluido com Sucesso!!!', 'INFO')
   showTable()
}
