function addContato(contato) {
    let editandoContato = getContato(contato.id)
    if(editandoContato) {
        editingContato(editandoContato, contato)
    } else {
        listaDeContatos.push(contato)
    }
}

function cleanInputsForm(elements) {
    elements.forEach(element => element.value = '')
}

function getIndexOfContato(contato) {
    let index = -1
    listaDeContatos.forEach((c, i) => c.id == contato.id ? index = i : index = -1)
    return index
}

function getContato(id) {
    return listaDeContatos.find(c => c.id == id ? c : undefined)
}

function editingContato(editandoContato, contato) {
    let index = getIndexOfContato(editandoContato)
    listaDeContatos.splice(index, 1)
    listaDeContatos[index] = contato
}

function editContato(id) {
    const contatoFound = listaDeContatos.find(c => c.id == id)
    addPage('cadastro', () => {
        inputId.value  = contatoFound.id
        inputName.value = contatoFound.name
        inputEmail.value = contatoFound.email
        inputPhone.value = contatoFound.phone
        img.src = contatoFound.img ? contatoFound.img : imageDefault
    })
}
