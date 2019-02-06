const imageDefault = '../img/user.png'

function showMessage(message, type) {
    const container = document.querySelector('.container-message')

    const msg = document.createElement('div')
    msg.classList.add('message')
    msg.classList.add(typeMessage(type))
    msg.innerHTML = message
    msg.style.visibility = 'visible'

    container.appendChild(msg)

    setTimeout(() => {
        msg.classList.remove(typeMessage(type))
        msg.style.visibility = 'hidden'
        container.removeChild(msg)
    }, 3000)
}

function typeMessage(type) {
    switch(type) {
        case 'ERROR':
            return 'message-error'
        case 'INFO':
            return 'message-info'
        default:
            return 'message-success'
    }
}

function SELETOR(element) {
    return document.querySelector(element)
}

function SELETOR_ID(elementId) {
    return document.getElementById(elementId)
}

function SELETOR_ALL(element) {
    return document.querySelectorAll(element)
}

function transformFirstLetterUpperCase(value) {
    return value[0].toUpperCase() + value.substring(1)
}
