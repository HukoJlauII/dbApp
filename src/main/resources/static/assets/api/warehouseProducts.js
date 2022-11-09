var warehouseProductsTable
var tBody
var inputsWarehouseProducts
var unitSelectWarehouseProducts
var createButtonWarehouseProducts
var paginationWarehouseProducts
let searchAreaWarehouseProducts
// searchArea.querySelector('.bi-search').addEventListener('click',findProduct,true)
// let currentLocation = document.location.protocol + "//" + document.location.host;
if (table === "warehouse-products") {
    warehouseProductsTable = document.querySelector('#warehouseProducts')
    tBody = warehouseProductsTable.getElementsByTagName('tbody')
    inputsWarehouseProducts = warehouseProductsTable.querySelectorAll('.form-control')
    unitSelectWarehouseProducts = warehouseProductsTable.querySelectorAll('.form-select')
    createButtonWarehouseProducts = warehouseProductsTable.querySelector('.pt-2')
    paginationWarehouseProducts = document.querySelector('.warehouseProducts')
    searchAreaWarehouseProducts = document.querySelector('#warehouseProductsSearch')
    searchAreaWarehouseProducts.querySelector('.bi-search').addEventListener('click', findWarehouseProduct, true)
    createButtonWarehouseProducts.addEventListener('click', createWarehouseProducts, true)
}

function loadProductsAndWarehouses() {
    $.ajax({
        url: currentLocation + "/api/warehouses/all",
        type: 'GET',
        contentType: 'application/json',
        success: fillWarehouses
    })
    $.ajax({
        url: currentLocation + "/api/products/all",
        type: 'GET',
        contentType: 'application/json',
        success: fillProducts
    })
}

function fillWarehouses(data) {
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].warehouseId
        option.innerHTML = data[i].warehouseId + " : " + data[i].name
        unitSelectWarehouseProducts[1].appendChild(option)
    }
}

function fillProducts(data) {
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].productId
        option.innerHTML = data[i].productId + " : " + data[i].name
        unitSelectWarehouseProducts[0].appendChild(option)
    }
}

function loadWarehouseProducts(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: currentLocation + "/api/warehouse-products?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllWarehouseProducts
    })
}

let createAllWarehouseProducts = function (data) {
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber * 10 + data.content.length : showElements = data.pageable.pageNumber * 10 + data.pageable.pageSize
    paginationWarehouseProducts.querySelector('.dataTable-info').innerHTML = "Showing " + Number(data.pageable.pageNumber * 10 + 1) + " to " + showElements + " of " + data.totalElements + " warehouseProducts"
    showPagination(data)
    for (let i = 0; i < data.content.length; i++) {
        createWarehouseProduct(data.content[i])
    }
}
if (table === "warehouse-products") {
    loadProductsAndWarehouses()
    loadWarehouseProducts(0)
}


function showUpdateForm(data) {

    const currentElement = document.querySelector(`#${CSS.escape(data.warehouseProductId)}`)
    let parentElement = currentElement.parentNode
    parentElement.style.display = 'none'
    const editForm = document.createElement('tr')
    editForm.classList.add(`text-center`)
    editForm.innerHTML = "<th scope=\"row\"><a href=\"#\">" + data.warehouseProductId + "</a></th>\n" +
        "                                                <td><select class=\"form-select\" aria-label=\"data.unit\">\n" +
        "                                                    <option value=\"" + data.product.productId + "\" selected=\"\">" + data.product.productId + " : " + data.product.name + "</option>\n" +
        "                                                </select></td>\n" +
        "                                                <td><select class=\"form-select\" aria-label=\"data.unit\">\n" +
        "                                                    <option value=\"" + data.warehouse.warehouseId + "\" selected=\"\">" + data.warehouse.warehouseId + " : " + data.warehouse.name + "</option>\n" +
        "                                                </select></td>\n" +
        "                                                <td><input type=\"number\" value='" + data.quantity + "' class=\"form-control\"></td>\n" +
        "                                                    <div class=\"pt-2 text-center\">\n" +
        "                                                        <button href=\"#\" class=\"btn btn-success btn-sm\"\n" +
        "                                                           title=\"Remove my profile image\"><i\n" +
        "                                                                class=\"bi bi-check\"></i></button>\n" +
        "                                                        <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                           title=\"Remove my profile image\"><i\n" +
        "                                                                class=\"bi bi-x\"></i></button>\n" +
        "                                                    </div>\n" +
        "                                                </td>"
    let selects = editForm.querySelectorAll('.form-select')
    for (let i = 0; i < unitSelectWarehouseProducts[0].children.length; i++) {
        let el=unitSelectWarehouseProducts[0].children[i].cloneNode()
        el.innerHTML=unitSelectWarehouseProducts[0].children[i].innerHTML
        selects[0].appendChild(el)
    }
    for (let i = 0; i < unitSelectWarehouseProducts[1].children.length; i++) {
        let el=unitSelectWarehouseProducts[1].children[i].cloneNode()
        el.innerHTML=unitSelectWarehouseProducts[1].children[i].innerHTML
        selects[1].appendChild(el)
    }
    let buttons = editForm.querySelectorAll(".bi")
    buttons[0].addEventListener('click', function () {
        updateWarehouseProduct(editForm, data.warehouseProductId)
    })
    buttons[1].addEventListener('click', function () {
        closeEditForm(editForm)
    })

    parentElement.parentNode.insertBefore(editForm, parentElement.nextSibling)

}

function closeEditForm(editForm) {
    let currentRow = editForm.previousSibling
    currentRow.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function updateWarehouseProduct(editForm, id) {
    let currentElement = editForm.previousSibling
    let editInputs = editForm.querySelectorAll('.form-control')
    let editSelect = editForm.querySelectorAll('.form-select')
    let warehouseProduct = {
        id: id,
        product: editSelect[0].value,
        warehouse: editSelect[1].value,
        quantity: editInputs[0].value
    }
    let fieldsToUpdate = currentElement.getElementsByTagName('td')
    console.log(editSelect[0].children[0])
    fieldsToUpdate[0].innerHTML = editSelect[0].children[0].innerHTML
    fieldsToUpdate[1].innerHTML = editSelect[1].children[0].innerHTML
    fieldsToUpdate[2].innerHTML = warehouseProduct.quantity + " шт."
    $.ajax({
        url: currentLocation + "/api/warehouse-products/"+id+"?product=" + warehouseProduct.product + "&warehouse=" + warehouseProduct.warehouse + "&quantity=" + warehouseProduct.quantity,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(warehouseProduct),
    })
    currentElement.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)

}

function findWarehouseProduct() {
    let search = searchAreaWarehouseProducts.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadWarehouseProducts(0)
    } else {
        $.ajax({
            url: currentLocation + "/api/warehouse-products/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllWarehouseProducts
        })
    }
}


function createWarehouseProducts() {

    let warehouseProduct = {
        product: unitSelectWarehouseProducts[0].value,
        warehouse: unitSelectWarehouseProducts[1].value,
        quantity: inputsWarehouseProducts[0].value
    }
    console.log(unitSelectWarehouseProducts[1].value)
    console.log(warehouseProduct)

    $.ajax({
        url: currentLocation + "/api/warehouse-products?product=" + warehouseProduct.product + "&warehouse=" + warehouseProduct.warehouse + "&quantity=" + warehouseProduct.quantity,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(warehouseProduct),
        success: createWarehouseProduct
    })

}


function createWarehouseProduct(data) {
    console.log(data)
    let warehouseProduct = document.createElement('tr')
    warehouseProduct.classList.add('text-center')
    warehouseProduct.innerHTML = "                                                <th id=\"" + data.warehouseProductId + "\" scope=\"row\">" + data.warehouseProductId + "</th>\n" +
        "                                                <td>" +data.product.productId+" : "+ data.product.name + "</td>\n" +
        "                                                <td>" +data.warehouse.warehouseId +" : "+data.warehouse.name + "</td>\n" +
        "                                                <td>" + data.quantity + " шт.</td>\n" +
        "                                                <td><div class=\"pt-2 text-center\">\n" +
        "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
        "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
        "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                       ><i\n" +
        "                                                            class=\"bi bi-trash\"></i></button>\n" +
        "                                                </div></td>\n"
    let updateButton = warehouseProduct.querySelector('.btn-warning')
    updateButton.addEventListener('click', function () {
        showUpdateForm(data)
    })
    let deleteButton = warehouseProduct.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
        deleteElement(data, warehouseProduct)
    })
    tBody[0].appendChild(warehouseProduct)

}

function deleteElement(data, warehouseProduct) {
    warehouseProduct.parentNode.removeChild(warehouseProduct)
    $.ajax({
        url: currentLocation + "/api/warehouse-products/" + data.warehouseProductId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function showPagination(data) {
    let pageList = paginationWarehouseProducts.querySelector('.pagination')
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
            loadProducts(data.pageable.pageNumber - 1)
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
                loadProducts(i)
            })
        } else {
            pageItem.classList.add('active')
        }
        pageList.appendChild(pageItem)
    }
    if (data.pageable.pageNumber != data.totalPages - 1) {
        console.log('nxt enabled')
        nxtButton.addEventListener('click', function () {
            loadProducts(data.pageable.pageNumber + 1)
        })
    }
    pageList.appendChild(nxtButton)


}