let warehousesTable
var tBody
var paginationWarehouses
let searchAreaWarehouses
var createWarehouseButton
var inputsWarehouse


if (table === "warehouses") {
    warehousesTable = document.querySelector('#warehouses');
    tBody = warehousesTable.getElementsByTagName('tbody')
    inputsWarehouse = warehousesTable.querySelectorAll('.form-control')
    createWarehouseButton = warehousesTable.querySelector('.pt-2')
    createWarehouseButton.addEventListener('click', createWarehouses, true)
    paginationWarehouses = document.querySelector('.warehouses')
    searchAreaWarehouses = document.querySelector('#warehousesSearch')
    searchAreaWarehouses.querySelector('.bi-search').addEventListener('click', findWarehouse, true)
}

function loadWarehouses(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: "http://localhost:8080/api/warehouses?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllWarehouses
    })
}

let createAllWarehouses = function (data) {
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber * 10 + data.content.length : showElements = data.pageable.pageNumber * 10 + data.pageable.pageSize
    paginationWarehouses.querySelector('.dataTable-info').innerHTML = "Showing " + Number(data.pageable.pageNumber * 10 + 1) + " to " + showElements + " of " + data.totalElements + " warehouses"
    showWarehousePagination(data)
    for (let i = 0; i < data.content.length; i++) {
        createWarehouse(data.content[i])
    }
}
if (table === "warehouses") {
    loadWarehouses(0)
}

function createWarehouses() {
    let warehouse = {
        name: inputsWarehouse[0].value,
        address: inputsWarehouse[1].value
    }

    $.ajax({
        url: currentLocation + "/api/warehouses",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(warehouse),
        success: createWarehouse
    })

}

function createWarehouse(data) {

    let warehouse = document.createElement('tr')
    warehouse.classList.add('text-center')
    warehouse.innerHTML = "                                                <th id=\"" + data.warehouseId + "\" scope=\"row\">" + data.warehouseId + "</th>\n" +
        "                                                <td>" + data.name + "</td>\n" +
        "                                                <td>" + data.address + "</td>\n" +
        "                                                <td><div class=\"pt-2 text-center\">\n" +
        "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
        "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
        "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                       ><i\n" +
        "                                                            class=\"bi bi-trash\"></i></button>\n" +
        "                                                </div></td>\n"
    let updateButton = warehouse.querySelector('.btn-warning')
    updateButton.addEventListener('click', function () {
        showUpdateWarehouseForm(data)
    })
    let deleteButton = warehouse.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
        deleteWarehouse(data, warehouse)
    })
    tBody[0].appendChild(warehouse)

}

// function createWarehouseLine(data) {
//     console.log(data)
//     let warehouse = document.createElement('tr')
//     warehouse.classList.add('text-center')
//     warehouse.innerHTML = "                                                <th id=\"" + data.warehouseId + "\" scope=\"row\">" + data.warehouseId + "</th>\n" +
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
//     let updateButton = warehouse.querySelector('.btn-warning')
//     updateButton.addEventListener('click', function () {
//         showUpdateWarehouseForm(data)
//     })
//     let deleteButton = warehouse.querySelector('.btn-danger')
//     if (deleteButton != null) {
//         deleteButton.addEventListener('click', function () {
//             deleteWarehouse(data, warehouse)
//         })
//     }
//
//
//     tBody[0].appendChild(warehouse)
// }

function showUpdateWarehouseForm(data) {

    const currentElement = document.querySelector(`#${CSS.escape(data.warehouseId)}`)
    let parentElement = currentElement.parentNode
    parentElement.style.display = 'none'
    const editForm = document.createElement('tr')
    editForm.classList.add(`text-center`)
    editForm.innerHTML = "<th scope=\"row\"><a href=\"#\">" + data.warehouseId + "</a></th>\n" +
        "                                                <td><input type=\"text\" value='" + data.name + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input name...\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.address + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input address...\"></td>\n" +
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
        updateWarehouse(editForm, data.warehouseId)
    })
    buttons[1].addEventListener('click', function () {
        closeEditWarehouseForm(editForm)
    })

    parentElement.parentNode.insertBefore(editForm, parentElement.nextSibling)

}

function closeEditWarehouseForm(editForm) {
    let currentRow = editForm.previousSibling
    currentRow.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function updateWarehouse(editForm, id) {
    let currentElement = editForm.previousSibling
    let editInputs = editForm.querySelectorAll('.form-control')
    console.log(editInputs)
    let warehouse = {
        id: id,
        name: editInputs[0].value,
        address: editInputs[1].value,
    }
    let fieldsToUpdate = currentElement.getElementsByTagName('td')
    fieldsToUpdate[0].innerHTML = warehouse.name
    fieldsToUpdate[1].innerHTML = warehouse.address
    $.ajax({
        url: currentLocation + "/api/warehouses/" + id,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(warehouse),
    })
    currentElement.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function deleteWarehouse(data, warehouse) {
    warehouse.parentNode.removeChild(warehouse)
    $.ajax({
        url: currentLocation + "/api/warehouses/" + data.warehouseId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function findWarehouse() {
    let search = searchAreaWarehouses.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadWarehouses(0)
    } else {
        $.ajax({
            url: currentLocation + "/api/warehouses/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllWarehouses
        })
    }
}

function showWarehousePagination(data) {
    let pageList = paginationWarehouses.querySelector('.pagination')
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
            loadWarehouses(data.pageable.pageNumber - 1)
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
                loadWarehouses(i)
            })
        } else {
            pageItem.classList.add('active')
        }
        pageList.appendChild(pageItem)
    }
    if (data.pageable.pageNumber != data.totalPages - 1) {
        console.log('nxt enabled')
        nxtButton.addEventListener('click', function () {
            loadWarehouses(data.pageable.pageNumber + 1)
        })
    }
    pageList.appendChild(nxtButton)


}