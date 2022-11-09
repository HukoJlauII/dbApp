let suppliersTable
var tBody
var paginationSuppliers
let searchAreaSuppliers
var createSupplierButton
var inputsSupplier


if (table === "suppliers") {
    suppliersTable = document.querySelector('#suppliers');
    tBody = suppliersTable.getElementsByTagName('tbody')
    inputsSupplier = suppliersTable.querySelectorAll('.form-control')
    createSupplierButton = suppliersTable.querySelector('.pt-2')
    createSupplierButton.addEventListener('click', createSuppliers, true)
    paginationSuppliers = document.querySelector('.suppliers')
    searchAreaSuppliers = document.querySelector('#suppliersSearch')
    searchAreaSuppliers.querySelector('.bi-search').addEventListener('click', findSupplier, true)
}

function loadSuppliers(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: "http://localhost:8080/api/suppliers?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllSuppliers
    })
}

let createAllSuppliers = function (data) {
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber * 10 + data.content.length : showElements = data.pageable.pageNumber * 10 + data.pageable.pageSize
    paginationSuppliers.querySelector('.dataTable-info').innerHTML = "Showing " + Number(data.pageable.pageNumber * 10 + 1) + " to " + showElements + " of " + data.totalElements + " suppliers"
    showSupplierPagination(data)
    for (let i = 0; i < data.content.length; i++) {
        createSupplier(data.content[i])
    }
}
if (table === "suppliers") {
    loadSuppliers(0)
}

function createSuppliers() {
    let supplier = {
        name: inputsSupplier[0].value,
        requisites: inputsSupplier[1].value
    }

    $.ajax({
        url: currentLocation + "/api/suppliers",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(supplier),
        success: createSupplier
    })

}

function createSupplier(data) {

    let supplier = document.createElement('tr')
    supplier.classList.add('text-center')
    supplier.innerHTML = "                                                <th id=\"" + data.supplierId + "\" scope=\"row\">" + data.supplierId + "</th>\n" +
        "                                                <td>" + data.name + "</td>\n" +
        "                                                <td>" + data.requisites+ "</td>\n" +
        "                                                <td><div class=\"pt-2 text-center\">\n" +
        "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
        "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
        "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                       ><i\n" +
        "                                                            class=\"bi bi-trash\"></i></button>\n" +
        "                                                </div></td>\n"
    let updateButton = supplier.querySelector('.btn-warning')
    updateButton.addEventListener('click', function () {
        showUpdateSupplierForm(data)
    })
    let deleteButton = supplier.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
        deleteSupplier(data, supplier)
    })
    tBody[0].appendChild(supplier)

}

// function createSupplierLine(data) {
//     console.log(data)
//     let supplier = document.createElement('tr')
//     supplier.classList.add('text-center')
//     supplier.innerHTML = "                                                <th id=\"" + data.supplierId + "\" scope=\"row\">" + data.supplierId + "</th>\n" +
//         "                                                <td>" + data.name + "</td>\n" +
//         "                                                <td>" + data.address + "</td>\n" +
//         "                                                <td><div class=\"pt-2 text-center\">\n" +
//         "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
//         "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
//         "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
//         "                                                       ><i\n" +
//         "                                                            class=\"bi bi-trash\"></i></button>\n" +
//         "                                                </div></td>\n"
//
//
//     let updateButton = supplier.querySelector('.btn-warning')
//     updateButton.addEventListener('click', function () {
//         showUpdateSupplierForm(data)
//     })
//     let deleteButton = supplier.querySelector('.btn-danger')
//     if (deleteButton != null) {
//         deleteButton.addEventListener('click', function () {
//             deleteSupplier(data, supplier)
//         })
//     }
//
//
//     tBody[0].appendChild(supplier)
// }

function showUpdateSupplierForm(data) {

    const currentElement = document.querySelector(`#${CSS.escape(data.supplierId)}`)
    let parentElement = currentElement.parentNode
    parentElement.style.display = 'none'
    const editForm = document.createElement('tr')
    editForm.classList.add(`text-center`)
    editForm.innerHTML = "<th scope=\"row\"><a href=\"#\">" + data.supplierId + "</a></th>\n" +
        "                                                <td><input type=\"text\" value='" + data.name + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input name...\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.address + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input requisites...\"></td>\n" +
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
        updateSupplier(editForm, data.supplierId)
    })
    buttons[1].addEventListener('click', function () {
        closeEditSupplierForm(editForm)
    })

    parentElement.parentNode.insertBefore(editForm, parentElement.nextSibling)

}

function closeEditSupplierForm(editForm) {
    let currentRow = editForm.previousSibling
    currentRow.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function updateSupplier(editForm, id) {
    let currentElement = editForm.previousSibling
    let editInputs = editForm.querySelectorAll('.form-control')
    console.log(editInputs)
    let supplier = {
        id: id,
        name: editInputs[0].value,
        requisites: editInputs[1].value,
    }
    let fieldsToUpdate = currentElement.getElementsByTagName('td')
    fieldsToUpdate[0].innerHTML = supplier.name
    fieldsToUpdate[1].innerHTML = supplier.address
    $.ajax({
        url: currentLocation + "/api/suppliers/" + id,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(supplier),
    })
    currentElement.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function deleteSupplier(data, supplier) {
    supplier.parentNode.removeChild(supplier)
    $.ajax({
        url: currentLocation + "/api/suppliers/" + data.supplierId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function findSupplier() {
    let search = searchAreaSuppliers.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadSuppliers(0)
    } else {
        $.ajax({
            url: currentLocation + "/api/suppliers/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllSuppliers
        })
    }
}

function showSupplierPagination(data) {
    let pageList = paginationSuppliers.querySelector('.pagination')
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
            loadSuppliers(data.pageable.pageNumber - 1)
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
                loadSuppliers(i)
            })
        } else {
            pageItem.classList.add('active')
        }
        pageList.appendChild(pageItem)
    }
    if (data.pageable.pageNumber != data.totalPages - 1) {
        console.log('nxt enabled')
        nxtButton.addEventListener('click', function () {
            loadSuppliers(data.pageable.pageNumber + 1)
        })
    }
    pageList.appendChild(nxtButton)


}