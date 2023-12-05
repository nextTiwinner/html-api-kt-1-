const storage = document.querySelector('#storage')
const key = document.querySelector('#key')
const value = document.querySelector('#value')
const addData = document.querySelector('#addData')
const table = document.querySelector('#table')
const clearAll = document.querySelector('#clearAll')

let deleteSomeItem
let currentStorage;

function updateTable() {
    table.lastChild.previousSibling.innerHTML = ''
    let newTable = ''
    let start = 0
    for (let i = start; i < currentStorage.length; i++) {
        const key = currentStorage.key(i)
        if(key === 'IsThisFirstTime_Log_From_LiveServer'){
            continue
        }
        newTable += `<tr><td>${key}</td><td>${currentStorage.getItem(key)}</td><td class="remove-item" id="deleteSomeItem">❌</td></tr>`
    }
    table.lastChild.previousSibling.innerHTML = newTable

    deleteSomeItem = document.querySelectorAll('#deleteSomeItem')
    deleteSomeItem.forEach(el => {
        el.addEventListener('click', () => deleteItem(el))
    });
}

function saveItem() {
    if (!key.value) {
        alert("отсутствует ключ")
    } else if (!value.value) {
        alert("отсутствует значение")
    } else {
        if (storage.value === 'sessionStorage') {
            sessionStorage.setItem(key.value, value.value)
        } else {
            localStorage.setItem(key.value, value.value)
        }
    }
    updateTable()
}

function getStorage() {
    currentStorage = storage.value
    if (storage.value === 'sessionStorage') {
        currentStorage = sessionStorage
        start = 1
    } else {
        currentStorage = localStorage
    }
    updateTable()
}

function deleteItem(el){
    if(!confirm('Вы уверены, что хотите удалить эту запись?')) return;
    currentStorage.removeItem(el.previousSibling.previousSibling.innerText)
    updateTable()
}

function clearStorage(){
    if(!confirm('Вы уверены, что хотите полностью очистить локальное хранилище?')) return;
    currentStorage.clear()
    if(currentStorage === sessionStorage){
        currentStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true)
    }
    updateTable()
}

addData.addEventListener('click', saveItem)
storage.addEventListener('change', getStorage)
clearAll.addEventListener('click', clearStorage)

getStorage()