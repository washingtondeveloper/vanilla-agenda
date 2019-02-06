let listaDeContatos = []


function contatosService(tbody) {
    /*fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            listaDeContatos.forEach((c, i) => {
                listaDeContatos.push(c)
                tbody.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${c.name}</td>
                        <td>${c.phone}</td>
                        <td>${c.email}</td>
                    </tr>
                `
            })
        })*/
        showTable()
        
}

function showTable() {
    tbody.innerHTML = ''

    if(listaDeContatos.length === 0)
        msgWithoutContacts()  
    else 
        listar()
}

function listar() {
    
    listaDeContatos.forEach((c, i) => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${c.img ? c.img : imageDefault}" /></td>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.phone}</td>
                <td>${c.email}</td>
                <td>
                    <a title="Editar" onclick=editar(${c.id}) style="color: blue">
                        <i class="fas fa-user-edit"></i>
                    </a>
                    <a  title="Excluir" onclick=remove(${c.id}) style="color: red">
                        <i class="fas fa-user-slash"></i>
                    </a>
                </td>
            </tr>
        `
    })
}

function msgWithoutContacts() {
    document.querySelector('tbody')
            .innerHTML = `
                <tr>
                    <td colspan="6">Não existe contato <strong>cadastrado</strong></td>
                </tr>
            `
}

function removeContato(idContato) {
    listaDeContatos = listaDeContatos.filter(c => c.id != idContato)
}

