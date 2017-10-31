buildMenu()
const menu = document.getElementById('menu')
function buildMenu (id = 0) {
    fetch(getUrl(id)).then(response => {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status)
            return
        }

        response.json().then(({ children }) => children.map(item => menu.appendChild(createElement(item))))
    })
    .catch(err => console.log('Fetch Error :-S', err))
}

function getUrl (id) {
    return 'https://dev.bfgw.bettings.ch/api/navigation/' + (parseInt(id) || '') + '?account_id=bHi9lzgei'
}

menu.onclick = function menuClick () {
    let id = event.target.id
    if (isNaN(parseInt(id))) return false
    menu.innerHTML = ''
    menu.appendChild(createElement({name: 'Main Menu', id: 0}))
    buildMenu(event.target.id)
}

function createElement (item) {
    let element = document.createElement('p')
    element.innerHTML = item.name
    element.id = item.id
    return element
}