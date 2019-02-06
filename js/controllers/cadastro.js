let containerImage, img, button, inputName, inputPhone, inputEmail, inputId

let contato = {}
let id = 0
let camposInvalidos = []

function cadastro() {
    containerImage = SELETOR('.image')
    img            = containerImage.children[0]
    button         = SELETOR('#btn-cadastro')
    inputId        = SELETOR('input[name="id"]')
    inputName      = SELETOR('input[name="name"]')
    inputEmail     = SELETOR('input[name="email"]')
    inputPhone     = SELETOR('input[name="phone"]')

    containerImage.addEventListener('click', getImage)
    button.addEventListener('click', cadastrar)
}

function getImage() {
   const file = SELETOR_ID('file')
   file.click()

   file.addEventListener('change', changeImage)
}

function changeImage() {
    const file = this.files[0]

    const reader = new FileReader()
    reader.onload = function(e) {
        img.src = e.target.result
        contato.img = e.target.result
    }

    reader.readAsDataURL(file)
    
}

function editar(id) {
    editContato(id)
}

function cadastrar(e) {
    e.preventDefault()
    cleanMsgErrorInput()
    
    if(!validarForm()) {
        camposInvalidos.forEach(c => {
            showMessage(`${c.getAttribute('placeholder')} é Obrigatório`, 'ERROR')
            c.classList.add('input-error')
        })
        camposInvalidos = []
        return
    }

    contato.id    = inputId.value ? inputId.value : ++id 
    contato.name  = inputName.value
    contato.phone = inputPhone.value
    contato.email = inputEmail.value

    addContato({ ...contato })
    showMessage('Cadastrado com Sucesso!!!', 'SUCCESS')

    cleanInputsForm([inputEmail, inputName, inputPhone])
    img.src = imageDefault
    contato = {}
}

function validarForm() {
    const inputs = SELETOR_ALL('input[placeholder]')
    let validado = true
    inputs.forEach(input => {
        if(input.value.length < 3){
            camposInvalidos.push(input)
            validado = false
        }
            
    } )
    return validado
}

function cleanMsgErrorInput() {
    const inputs = SELETOR_ALL('input[type="text"]')
    inputs.forEach(input => input.classList.remove('input-error'))
}
