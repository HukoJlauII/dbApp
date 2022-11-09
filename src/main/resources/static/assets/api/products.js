var productsTable
var tBody
var inputs
var unitSelect
var createButton
var pagination
let searchArea
// searchArea.querySelector('.bi-search').addEventListener('click',findProduct,true)
// let currentLocation = document.location.protocol + "//" + document.location.host;
if (table==="products") {
    productsTable = document.querySelector('#products')
    tBody = productsTable.getElementsByTagName('tbody')
    inputs = productsTable.querySelectorAll('.form-control')
    unitSelect = productsTable.querySelector('.form-select')
    createButton = productsTable.querySelector('.pt-2')
    pagination = document.querySelector('.products')
    searchArea = document.querySelector('#productsSearch')
    searchArea.querySelector('.bi-search').addEventListener('click',findProduct,true)
    createButton.addEventListener('click', createProducts, true)
}



function loadProducts(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: currentLocation + "/api/products?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllProducts
    })
}

let createAllProducts = function (data) {
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber*10+data.content.length : showElements = data.pageable.pageNumber*10+data.pageable.pageSize
        pagination.querySelector('.dataTable-info').innerHTML = "Showing " +Number(data.pageable.pageNumber*10+1)+" to " + showElements + " of " + data.totalElements + " products"
    showPagination(data)
    for (let i = 0; i < data.content.length; i++) {
        createProduct(data.content[i])
    }
}
if (table==="products") {
    loadProducts(0)
}

// function createLine(data) {
//     let product = document.createElement('tr')
//     product.classList.add('text-center')
//     product.innerHTML = "                                                <th id=\"" + data.productId + "\" scope=\"row\">" + data.productId + "</th>\n" +
//         "                                                <td>" + data.name + "</td>\n" +
//         "                                                <td>" + data.unit + "</td>\n" +
//         "                                                <td>" + data.price + " $</td>\n" +
//         "                                                <td>" + data.description + "</td>\n" +
//         "                                                <td><span class=\"badge bg-success\">" + data.producer + "</span></td>\n" +
//         "                                                <td><div class=\"pt-2 text-center\">\n" +
//         "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
//         "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
//         "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
//         "                                                       ><i\n" +
//         "                                                            class=\"bi bi-trash\"></i></button>\n" +
//         "                                                </div></td>\n"
//
//     let updateButton = product.querySelector('.btn-warning')
//     updateButton.addEventListener('click', function () {
//         showUpdateForm(data)
//     })
//     let deleteButton = product.querySelector('.btn-danger')
//     deleteButton.addEventListener('click', function () {
//         deleteElement(data, product)
//     })
//
//     tBody[0].appendChild(product)
// }

function showUpdateForm(data) {

    const currentElement = document.querySelector(`#${CSS.escape(data.productId)}`)
    let parentElement = currentElement.parentNode
    parentElement.style.display = 'none'
    const editForm = document.createElement('tr')
    editForm.classList.add(`text-center`)
    editForm.innerHTML = "<th scope=\"row\"><a href=\"#\">" + data.productId + "</a></th>\n" +
        "                                                <td><input type=\"text\" value='" + data.name + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input product name...\"></td>\n" +
        "                                                <td><select class=\"form-select\" aria-label=\"data.unit\">\n" +
        "                                                    <option value=\"" + data.unit + "\" selected=\"\">kg</option>\n" +
        "                                                    <option value=\"kg\">kg</option>\n" +
        "                                                    <option value=\"g\">g</option>\n" +
        "                                                    <option value=\"m^3\">m^3</option>\n" +
        "                                                    <option value=\"cm^3\">cm^3</option>\n" +
        "                                                    <option value=\"l\">l</option>\n" +
        "                                                </select></td>\n" +
        "                                                <td><input type=\"number\" value='" + data.price + "' class=\"form-control\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.description + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input product description...\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.producer + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input product producer...\"></td>\n" +
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
        updateProduct(editForm, data.productId)
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

function updateProduct(editForm, id) {
    let currentElement = editForm.previousSibling
    let editInputs = editForm.querySelectorAll('.form-control')
    let editSelect = editForm.querySelector('.form-select')
    let product = {
        id: id,
        name: editInputs[0].value,
        unit: editSelect.value,
        price: Number(editInputs[1].value),
        description: editInputs[2].value,
        producer: editInputs[3].value
    }
    let fieldsToUpdate = currentElement.getElementsByTagName('td')
    fieldsToUpdate[0].innerHTML = product.name
    fieldsToUpdate[1].innerHTML = product.unit
    fieldsToUpdate[2].innerHTML = product.price + " $"
    fieldsToUpdate[3].innerHTML = product.description
    fieldsToUpdate[4].innerHTML = "<span class=\"badge bg-success\">" + product.producer + "</span>"
    $.ajax({
        url: currentLocation + "/api/products/" + id,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(product),
    })
    currentElement.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)

}

function findProduct() {
    let search = searchArea.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadProducts(0)
    }
    else{
        $.ajax({
            url: currentLocation + "/api/products/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllProducts
        })
    }
}

function createProducts() {
    let product = {
        name: inputs[0].value,
        unit: unitSelect.value,
        price: Number(inputs[1].value),
        description: inputs[2].value,
        producer: inputs[3].value
    }


    $.ajax({
        url: currentLocation + "/api/products",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(product),
        success: createProduct
    })

}

function createProduct(data) {

    let product = document.createElement('tr')
    product.classList.add('text-center')
    product.innerHTML = "                                                <th id=\"" + data.productId + "\" scope=\"row\">" + data.productId + "</th>\n" +
        "                                                <td>" + data.name + "</td>\n" +
        "                                                <td>" + data.unit + "</td>\n" +
        "                                                <td>" + data.price + " $</td>\n" +
        "                                                <td>" + data.description + "</td>\n" +
        "                                                <td><span class=\"badge bg-success\">" + data.producer + "</span></td>\n" +
        "                                                <td><div class=\"pt-2 text-center\">\n" +
        "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
        "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
        "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                       ><i\n" +
        "                                                            class=\"bi bi-trash\"></i></button>\n" +
        "                                                </div></td>\n"
    let updateButton = product.querySelector('.btn-warning')
    updateButton.addEventListener('click', function () {
        showUpdateForm(data)
    })
    let deleteButton = product.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
        deleteElement(data, product)
    })
    tBody[0].appendChild(product)

}

function deleteElement(data, product) {
    product.parentNode.removeChild(product)
    $.ajax({
        url: currentLocation + "/api/products/" + data.productId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function showPagination(data) {
    let pageList = pagination.querySelector('.pagination')
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