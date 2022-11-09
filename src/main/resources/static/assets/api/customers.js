let customersTable
var tBody
var paginationCustomers
let searchAreaCustomers
var createCustomerButton
var inputsCustomer


if (table === "customers") {
    customersTable = document.querySelector('#customers');
    tBody = customersTable.getElementsByTagName('tbody')
    inputsCustomer = customersTable.querySelectorAll('.form-control')
    createCustomerButton = customersTable.querySelector('.pt-2')
    createCustomerButton.addEventListener('click', createCustomers, true)
    paginationCustomers = document.querySelector('.customers')
    searchAreaCustomers = document.querySelector('#customersSearch')
    searchAreaCustomers.querySelector('.bi-search').addEventListener('click', findCustomer, true)
}

function loadCustomers(page) {
    if (page === undefined) {
        page = 0
    }
    $.ajax({
        url: "http://localhost:8080/api/customers?page=" + page,
        type: 'GET',
        contentType: 'application/json',
        success: createAllCustomers
    })
}

let createAllCustomers = function (data) {
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    let showElements
    data.content.length < data.pageable.pageSize ? showElements = data.pageable.pageNumber * 10 + data.content.length : showElements = data.pageable.pageNumber * 10 + data.pageable.pageSize
    paginationCustomers.querySelector('.dataTable-info').innerHTML = "Showing " + Number(data.pageable.pageNumber * 10 + 1) + " to " + showElements + " of " + data.totalElements + " customers"
    showCustomerPagination(data)
    for (let i = 0; i < data.content.length; i++) {
        createCustomer(data.content[i])
    }
}
if (table === "customers") {
    loadCustomers(0)
}

function createCustomers() {
    let customer = {
        name: inputsCustomer[0].value,
        surname: inputsCustomer[1].value,
        discount: inputsCustomer[2].value,
        city: inputsCustomer[3].value
    }

    $.ajax({
        url: currentLocation + "/api/customers",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(customer),
        success: createCustomer
    })

}

function createCustomer(data) {

    let customer = document.createElement('tr')
    customer.classList.add('text-center')
    customer.innerHTML = "                                                <th id=\"" + data.customerId + "\" scope=\"row\">" + data.customerId + "</th>\n" +
        "                                                <td>" + data.name + "</td>\n" +
        "                                                <td>" + data.surname + "</td>\n" +
        "                                                <td>" + data.discount + " %</td>\n" +
        "                                                <td>" + data.city + "</td>\n" +
        "                                                <td><div class=\"pt-2 text-center\">\n" +
        "                                                    <button href=\"#\" class=\"btn btn-warning btn-sm\"\n" +
        "                                                       ><i class=\"bi bi-arrow-bar-up\"></i></button>\n" +
        "                                                    <button href=\"#\" class=\"btn btn-danger btn-sm\"\n" +
        "                                                       ><i\n" +
        "                                                            class=\"bi bi-trash\"></i></button>\n" +
        "                                                </div></td>\n"
    let updateButton = customer.querySelector('.btn-warning')
    updateButton.addEventListener('click', function () {
        showUpdateCustomerForm(data)
    })
    let deleteButton = customer.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
        deleteCustomer(data, customer)
    })
    tBody[0].appendChild(customer)

}

// function createCustomerLine(data) {
//     console.log(data)
//     let customer = document.createElement('tr')
//     customer.classList.add('text-center')
//     customer.innerHTML = "                                                <th id=\"" + data.customerId + "\" scope=\"row\">" + data.customerId + "</th>\n" +
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
//     let updateButton = customer.querySelector('.btn-warning')
//     updateButton.addEventListener('click', function () {
//         showUpdateCustomerForm(data)
//     })
//     let deleteButton = customer.querySelector('.btn-danger')
//     if (deleteButton != null) {
//         deleteButton.addEventListener('click', function () {
//             deleteCustomer(data, customer)
//         })
//     }
//
//
//     tBody[0].appendChild(customer)
// }

function showUpdateCustomerForm(data) {

    const currentElement = document.querySelector(`#${CSS.escape(data.customerId)}`)
    let parentElement = currentElement.parentNode
    parentElement.style.display = 'none'
    const editForm = document.createElement('tr')
    editForm.classList.add(`text-center`)
    editForm.innerHTML = "<th scope=\"row\"><a href=\"#\">" + data.customerId + "</a></th>\n" +
        "                                                <td><input type=\"text\" value='" + data.name + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input name...\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.surname + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input surname...\"></td>\n" +
        "                                                <td><input type=\"number\" value='" + data.discount + "' min='0' max='100' class=\"form-control\"></td>\n" +
        "                                                <td><input type=\"text\" value='" + data.city + "' class=\"form-control\"\n" +
        "                                                           placeholder=\"Input product description...\"></td>\n" +
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
        updateCustomer(editForm, data.customerId)
    })
    buttons[1].addEventListener('click', function () {
        closeEditCustomerForm(editForm)
    })

    parentElement.parentNode.insertBefore(editForm, parentElement.nextSibling)

}

function closeEditCustomerForm(editForm) {
    let currentRow = editForm.previousSibling
    currentRow.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function updateCustomer(editForm, id) {
    let currentElement = editForm.previousSibling
    let editInputs = editForm.querySelectorAll('.form-control')
    console.log(editInputs)
    let customer = {
        id: id,
        name: editInputs[0].value,
        surname: editInputs[1].value,
        discount:editInputs[2].value,
        city:editInputs[3].value
    }
    let fieldsToUpdate = currentElement.getElementsByTagName('td')
    fieldsToUpdate[0].innerHTML = customer.name
    fieldsToUpdate[1].innerHTML = customer.surname
    fieldsToUpdate[2].innerHTML = customer.discount+" %"
    fieldsToUpdate[3].innerHTML = customer.city
    $.ajax({
        url: currentLocation + "/api/customers/" + id,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(customer),
    })
    currentElement.style.display = 'table-row'
    editForm.parentNode.removeChild(editForm)
}

function deleteCustomer(data, customer) {
    customer.parentNode.removeChild(customer)
    $.ajax({
        url: currentLocation + "/api/customers/" + data.customerId,
        type: 'DELETE',
        contentType: 'application/json',
    })
}

function findCustomer() {
    let search = searchAreaCustomers.querySelector('.dataTable-input').value
    while (tBody[0].children.length > 1) {
        tBody[0].removeChild(tBody[0].lastChild)
    }
    if (search === '') {
        loadCustomers(0)
    } else {
        $.ajax({
            url: currentLocation + "/api/customers/search?search=" + search,
            type: 'GET',
            contentType: 'application/json',
            success: createAllCustomers
        })
    }
}

function showCustomerPagination(data) {
    let pageList = paginationCustomers.querySelector('.pagination')
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
            loadCustomers(data.pageable.pageNumber - 1)
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
                loadCustomers(i)
            })
        } else {
            pageItem.classList.add('active')
        }
        pageList.appendChild(pageItem)
    }
    if (data.pageable.pageNumber != data.totalPages - 1) {
        console.log('nxt enabled')
        nxtButton.addEventListener('click', function () {
            loadCustomers(data.pageable.pageNumber + 1)
        })
    }
    pageList.appendChild(nxtButton)


}