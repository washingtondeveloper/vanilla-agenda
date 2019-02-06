const barItens = document.querySelectorAll('.bar-item')
const main     = document.querySelector('.main')

barItens.forEach(barItem => barItem.addEventListener('click', actionMenu))

function actionMenu(element) {
    const page = element.target.innerText.toLowerCase()    
    addPage(page)
}

function pages(page) {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(xhttp.responseText)
            }
        }

        xhttp.open("GET", `views/${page}.html`, true)
        xhttp.send()
    })
}

function addActive(htmlPage) {
    barItens.forEach(el => {
        el.classList.remove('active')
        
        if(el.innerText === htmlPage) el.classList.add('active')
    })
}

function addPage(htmlPage, cb) {
        
    addActive(transformFirstLetterUpperCase(htmlPage))

    pages(htmlPage)
        .then(p => {
            main.innerHTML = p;
            eval(htmlPage+'()')
            if(cb) cb()
        })
        .catch(err => console.log(err))
}


addPage('contatos')

window.onload = function () {
    SELETOR_ID('date')
        .innerText = new Date().toLocaleDateString().substring(6);
}
