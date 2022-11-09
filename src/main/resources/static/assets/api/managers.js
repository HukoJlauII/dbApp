let managersTable
var tBody
var paginationManagers
let searchAreaManagers


if (table==="managers") {
    managersTable = document.querySelector('#managers');
    tBody = managersTable.getElementsByTagName('tbody')
    paginationManagers = document.querySelector('.managers')
    searchAreaManagers = document.querySelector('#managersSearch')
    searchAreaManagers.querySelector('.bi-search').addEventListener('click', findManager, true)
}
function loadManagers(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: "http://localhost:8080/api/managers?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllManagers
    })
}

let createAllManagers = function (data) {
    while (tBody[0].children.length > 0) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber * 10 + data.content.length : showElements = data.pageable.pageNumber * 10 + data.pageable.pageSize
    paginationManagers.querySelector('.dataTable-info').innerHTML = "Showing " + Number(data.pageable.pageNumber * 10 + 1) + " to " + showElements + " of " + data.totalElements + " managers"
    showManagerPagination(data)
    for (let i = 0; i < data.content.length; i++) {
        createManagerLine(data.content[i])
    }
}
if (table==="managers") {
    loadManagers(0)
}

function createManagerLine(data) {
    console.log(data)
    let manager = document.createElement('tr')
    // manager.classList.add('text-center')
    manager.innerHTML = "                                                <th id=\"" + data.managerId + "\" scope=\"row\">" + data.managerId + "</th>\n" +
        "                                                <td>" + data.name + "</td>\n" +
        "                                                <td>" + data.surname + "</td>\n" +
        "                                                <td>" + data.email + "</td>\n" +
        "                                                <td>" + data.telephone + "</td>\n"
    if (data.managerId !== user.managerId) {
        manager.innerHTML += "                                                <td><div class=\"pt-2 text-center\">\n" +
            "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
            "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
            "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
            "                                                       ><i\n" +
            "                                                            class=\"bi bi-trash\"></i></button>\n" +
            "                                                </div></td>\n"
    } else {
        manager.innerHTML += "                                                <td><div class=\"pt-2 text-center\">\n" +
            "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
            "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
            "                                                </div></td>\n"
    }

    let updateButton = manager.querySelector('.btn-warning')
    updateButton.addEventListener('click', function () {
        showUpdateManagerForm(data)
    })
    let deleteButton = manager.querySelector('.btn-danger')
    if (deleteButton!=null){
    deleteButton.addEventListener('click', function () {
        deleteManager(data, manager)
    })}


    tBody[0].appendChild(manager)
}
function showUpdateManagerForm(data) {

    const currentElement = document.querySelector(`#${CSS.escape(data.managerId)}`)
    let parentElement = currentElement.parentNode
    parentElement.style.display = 'none'
    const editForm = document.createElement('tr')
    editForm.classList.add(`text-center`)
    editForm.innerHTML = "<th scope=\"row\"><a href=\"#\">" + data.managerId + "</a></th>\n" +
        "                                                <td><input type=\"text\" value='" + data.name + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input name...\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.surname + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input surname...\"></td>\n" +
        "                                                <td><input type=\"email\" value='" + data.email + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input email...\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.telephone + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input telephone...\"></td>\n" +
        "                                                <td>\n" +
        "                                                    <div class=\"pt-2 text-center\">\n" +
        "                                                        <button href=\"#\" class=\"btn btn-success btn-sm\"\n" +
        "                                                           title=\"Remove my profile image\"><i\n" +
        "                                                                class=\"bi bi-check\"></i></button>\n" +
        "                                                        <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                           title=\"Remove my profile image\"><i\n" +
        "                                                                class=\"bi bi-x\"></i></button>\n" +
        "                                                    </div>\n" +
        "                                                </td>"
    let buttons = editForm.querySelectorAll(".bi")
    buttons[0].addEventListener('click', function () {
        updateManager(editForm, data.managerId)
    })
    buttons[1].addEventListener('click', function () {
        closeEditManagerForm(editForm)
    })

    parentElement.parentNode.insertBefore(editForm, parentElement.nextSibling)

}

function closeEditManagerForm(editForm) {
    let currentRow = editForm.previousSibling
    currentRow.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function updateManager(editForm, id) {
    let currentElement = editForm.previousSibling
    let editInputs = editForm.querySelectorAll('.form-control')
    console.log(editInputs)
    let manager = {
        id: id,
        name: editInputs[0].value,
        surname:editInputs[1].value,
        email:editInputs[2].value,
        telephone:editInputs[3].value
    }
    let fieldsToUpdate = currentElement.getElementsByTagName('td')
    fieldsToUpdate[0].innerHTML = manager.name
    fieldsToUpdate[1].innerHTML = manager.surname
    fieldsToUpdate[2].innerHTML = manager.email
    fieldsToUpdate[3].innerHTML = manager.telephone

    $.ajax({
        url: currentLocation + "/api/managers/" + id,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(manager),
    })
    currentElement.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}
function deleteManager(data, manager) {
    manager.parentNode.removeChild(manager)
    $.ajax({
        url: currentLocation + "/api/managers/" + data.managerId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function findManager() {
    let search = searchAreaManagers.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadManagers(0)
    }
    else{
        $.ajax({
            url: currentLocation + "/api/managers/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllManagers
        })
    }
}
function showManagerPagination(data) {
    let pageList = paginationManagers.querySelector('.pagination')
    while (pageList.children.length > 0) {
        pageList.removeChild(pageList.lastChild)
    }
    let prevButton = document.createElement('li')
    prevButton.classList.add('page-item')
    prevButton.innerHTML = "<button class=\"page-link\" href=\"#\" aria-label=\"Previous\">\n" +
        "                                                        <span aria-hidden=\"true\">«</span>\n" +
        "                                                    </button>"
    let nxtButton = document.createElement('li')
    nxtButton.classList.add('page-item')
    nxtButton.innerHTML = "<button class=\"page-link\" href=\"#\" aria-label=\"Previous\">\n" +
        "                                                        <span aria-hidden=\"true\">»</span>\n" +
        "                                                    </button>"
    pageList.appendChild(prevButton)
    if (data.pageable.pageNumber != 0) {
        console.log('prev enabled')
        prevButton.addEventListener('click', function () {
            loadManagers(data.pageable.pageNumber - 1)
        })
    }
    for (let i = 0; i < data.totalPages; i++) {
        let pageItem = document.createElement('li')
        pageItem.classList.add('page-item')
        pageItem.innerHTML = "<button class=\"page-link\" href=\"#\" aria-label=\"Previous\">\n" +
            "                                                        <span aria-hidden=\"true\">" + Number(i + 1) + "</span>\n" +
            "                                                    </button>"

        if (i != data.pageable.pageNumber) {

            pageItem.addEventListener('click', function () {
                loadManagers(i)
            })
        } else {
            pageItem.classList.add('active')
        }
        pageList.appendChild(pageItem)
    }
    if (data.pageable.pageNumber != data.totalPages - 1) {
        console.log('nxt enabled')
        nxtButton.addEventListener('click', function () {
            loadManagers(data.pageable.pageNumber + 1)
        })
    }
    pageList.appendChild(nxtButton)


}