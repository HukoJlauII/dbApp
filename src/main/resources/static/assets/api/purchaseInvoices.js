var purchaseInvoiceTable
var tBody
var inputsPurchaseInvoice
var unitSelectPurchaseInvoice
var createButtonPurchaseInvoice
var paginationPurchaseInvoice
let searchAreaPurchaseInvoice

if (table === "purchase-invoices") {
    purchaseInvoiceTable = document.querySelector('#purchaseInvoice')
    console.log(purchaseInvoiceTable)
    tBody = purchaseInvoiceTable.getElementsByTagName('tbody')
    inputsPurchaseInvoice = purchaseInvoiceTable.querySelectorAll('.form-control')
    unitSelectPurchaseInvoice = purchaseInvoiceTable.querySelectorAll('.form-select')
    createButtonPurchaseInvoice = purchaseInvoiceTable.querySelector('.pt-2')
    paginationPurchaseInvoice = document.querySelector('.purchaseInvoice')
    searchAreaPurchaseInvoice = document.querySelector('#purchaseInvoiceSearch')
    searchAreaPurchaseInvoice.querySelector('.bi-search').addEventListener('click', findPurchaseInvoice, true)
    createButtonPurchaseInvoice.addEventListener('click', createPurchaseInvoices, true)
}

function loadSelects() {
    $.ajax({
        url: currentLocation + "/api/warehouses/all",
        type: 'GET',
        contentType: 'application/json',
        success: fillWarehousesI
    })
    $.ajax({
        url: currentLocation + "/api/products/all",
        type: 'GET',
        contentType: 'application/json',
        success: fillProductsI
    })
    $.ajax({
        url: currentLocation + "/api/suppliers/all",
        type: 'GET',
        contentType: 'application/json',
        success: fillSuppliersI
    })
}

function fillProductsI(data) {
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].productId
        option.innerHTML = data[i].productId + " : " + data[i].name
        unitSelectPurchaseInvoice[0].appendChild(option)
    }
}

function fillWarehousesI(data) {
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].warehouseId
        option.innerHTML = data[i].warehouseId + " : " + data[i].name
        unitSelectPurchaseInvoice[1].appendChild(option)
    }
}


function fillSuppliersI(data) {

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].supplierId
        option.innerHTML = data[i].supplierId + " : " + data[i].name
        unitSelectPurchaseInvoice[2].appendChild(option)
    }
}

function loadPurchaseInvoice(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: currentLocation + "/api/purchase-invoices?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllPurchaseInvoice
    })
}

let createAllPurchaseInvoice = function (data) {
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber * 10 + data.content.length : showElements = data.pageable.pageNumber * 10 + data.pageable.pageSize
    paginationPurchaseInvoice.querySelector('.dataTable-info').innerHTML = "Showing " + Number(data.pageable.pageNumber * 10 + 1) + " to " + showElements + " of " + data.totalElements + " purchaseInvoice"
    showPaginationPurchase(data)
    for (let i = 0; i < data.content.length; i++) {
        createPurchaseInvoice(data.content[i])
    }
}
if (table === "purchase-invoices") {
    loadSelects()
    loadPurchaseInvoice(0)
}


function findPurchaseInvoice() {
    let search = searchAreaPurchaseInvoice.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadPurchaseInvoice(0)
    } else {
        $.ajax({
            url: currentLocation + "/api/purchase-invoices/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllPurchaseInvoice
        })
    }
}


function createPurchaseInvoices() {

    let purchaseInvoice = {
        product: unitSelectPurchaseInvoice[0].value,
        warehouse: unitSelectPurchaseInvoice[1].value,
        supplier: unitSelectPurchaseInvoice[2].value,
    }

    $.ajax({
        url: currentLocation + "/api/purchase-invoices?product=" + purchaseInvoice.product + "&warehouse=" + purchaseInvoice.warehouse + "&supplier=" + purchaseInvoice.supplier,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(purchaseInvoice),
        success: createPurchaseInvoice
    })

}


function createPurchaseInvoice(data) {
    console.log(data.manager)
    let purchaseInvoice = document.createElement('tr')
    purchaseInvoice.classList.add('text-center')
    purchaseInvoice.innerHTML = "                                                <th id=\"" + data.purchaseInvoiceId + "\" scope=\"row\">" + data.purchaseInvoiceId + "</th>\n" +
        "                                                <td>" + data.manager.name + " " + data.manager.surname + "</td>\n" +
        "                                                <td>" + data.product.productId + " : " + data.product.name + "</td>\n" +
        "                                                <td>" + data.warehouse.warehouseId + " : " + data.warehouse.name + "</td>\n" +
        "                                                <td>" + data.supplier.supplierId + " : " + data.supplier.name + "</td>\n" +
        "                                                <td>" + data.dateTime + "</td>\n" +
        "                                                <td><div class=\"pt-2 text-center\">\n" +
        "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                       ><i\n" +
        "                                                            class=\"bi bi-trash\"></i></button>\n" +
        "                                                </div></td>\n"
    let deleteButton = purchaseInvoice.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
        deleteElement(data, purchaseInvoice)
    })
    tBody[0].appendChild(purchaseInvoice)

}

function deleteElement(data, purchaseInvoice) {
    purchaseInvoice.parentNode.removeChild(purchaseInvoice)
    $.ajax({
        url: currentLocation + "/api/purchase-invoices/" + data.purchaseInvoiceId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function showPaginationPurchase(data) {
    let pageList = paginationPurchaseInvoice.querySelector('.pagination')
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