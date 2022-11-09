var commercialInvoiceTable
var tBody
var inputsCommercialInvoice
var unitSelectCommercialInvoice
var createButtonCommercialInvoice
var paginationCommercialInvoice
let searchAreaCommercialInvoice

if (table === "commercial-invoices") {
    commercialInvoiceTable = document.querySelector('#commercialInvoice')
    console.log(commercialInvoiceTable)
    tBody = commercialInvoiceTable.getElementsByTagName('tbody')
    inputsCommercialInvoice = commercialInvoiceTable.querySelectorAll('.form-control')
    unitSelectCommercialInvoice = commercialInvoiceTable.querySelectorAll('.form-select')
    createButtonCommercialInvoice = commercialInvoiceTable.querySelector('.pt-2')
    paginationCommercialInvoice = document.querySelector('.commercialInvoice')
    searchAreaCommercialInvoice = document.querySelector('#commercialInvoiceSearch')
    searchAreaCommercialInvoice.querySelector('.bi-search').addEventListener('click', findCommercialInvoice, true)
    createButtonCommercialInvoice.addEventListener('click', createCommercialInvoices, true)
}

function loadSelectsI() {
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
        url: currentLocation + "/api/customers/all",
        type: 'GET',
        contentType: 'application/json',
        success: fillCustomersI
    })
}

function fillProductsI(data) {
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].productId
        option.innerHTML = data[i].productId + " : " + data[i].name
        unitSelectCommercialInvoice[0].appendChild(option)
    }
}

function fillWarehousesI(data) {
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].warehouseId
        option.innerHTML = data[i].warehouseId + " : " + data[i].name
        unitSelectCommercialInvoice[1].appendChild(option)
    }
}


function fillCustomersI(data) {

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].customerId
        option.innerHTML = data[i].name + " " + data[i].surname
        unitSelectCommercialInvoice[2].appendChild(option)
    }
}

function loadCommercialInvoice(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: currentLocation + "/api/commercial-invoices?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllCommercialInvoice
    })
}

let createAllCommercialInvoice = function (data) {
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber * 10 + data.content.length : showElements = data.pageable.pageNumber * 10 + data.pageable.pageSize
    paginationCommercialInvoice.querySelector('.dataTable-info').innerHTML = "Showing " + Number(data.pageable.pageNumber * 10 + 1) + " to " + showElements + " of " + data.totalElements + " commercialInvoice"
    showPaginationCommercial(data)
    for (let i = 0; i < data.content.length; i++) {
        createCommercialInvoice(data.content[i])
    }
}
if (table === "commercial-invoices") {
    loadSelectsI()
    loadCommercialInvoice(0)
}


function findCommercialInvoice() {
    let search = searchAreaCommercialInvoice.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadCommercialInvoice(0)
    } else {
        $.ajax({
            url: currentLocation + "/api/commercial-invoices/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllCommercialInvoice
        })
    }
}


function createCommercialInvoices() {

    let commercialInvoice = {
        product: unitSelectCommercialInvoice[0].value,
        warehouse: unitSelectCommercialInvoice[1].value,
        customer: unitSelectCommercialInvoice[2].value,
    }

    $.ajax({
        url: currentLocation + "/api/commercial-invoices?product=" + commercialInvoice.product + "&warehouse=" + commercialInvoice.warehouse + "&customer=" + commercialInvoice.customer,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(commercialInvoice),
        success: createCommercialInvoice
    })

}


function createCommercialInvoice(data) {
    console.log(data)
    let commercialInvoice = document.createElement('tr')
    commercialInvoice.classList.add('text-center')
    commercialInvoice.innerHTML = "                                                <th id=\"" + data.commercialInvoiceId + "\" scope=\"row\">" + data.commercialInvoiceId + "</th>\n" +
        "                                                <td>" + data.manager.name + " " + data.manager.surname + "</td>\n" +
        "                                                <td>" + data.product.productId + " : " + data.product.name + "</td>\n" +
        "                                                <td>" + data.warehouse.warehouseId + " : " + data.warehouse.name + "</td>\n" +
        "                                                <td>" + data.customer.name + " " + data.customer.surname + "</td>\n" +
        "                                                <td>" + data.date + "</td>\n" +
        "                                                <td><div class=\"pt-2 text-center\">\n" +
        "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                       ><i\n" +
        "                                                            class=\"bi bi-trash\"></i></button>\n" +
        "                                                </div></td>\n"
    let deleteButton = commercialInvoice.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
        deleteElement(data, commercialInvoice)
    })
    tBody[0].appendChild(commercialInvoice)

}

function deleteElement(data, commercialInvoice) {
    commercialInvoice.parentNode.removeChild(commercialInvoice)
    $.ajax({
        url: currentLocation + "/api/commercial-invoices/" + data.commercialInvoiceId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function showPaginationCommercial(data) {
    let pageList = paginationCommercialInvoice.querySelector('.pagination')
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
        nxtButton.addEventListener('click', function () {
            loadProducts(data.pageable.pageNumber + 1)
        })
    }
    pageList.appendChild(nxtButton)


}