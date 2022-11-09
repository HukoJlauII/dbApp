package com.example.dbapp.controller;

import com.example.dbapp.entity.CommercialInvoice;
import com.example.dbapp.entity.Customer;
import com.example.dbapp.entity.Product;
import com.example.dbapp.entity.Warehouse;
import com.example.dbapp.repository.CommercialInvoiceRepository;
import com.example.dbapp.repository.CustomerRepository;
import com.example.dbapp.repository.ProductRepository;
import com.example.dbapp.repository.WarehouseRepository;
import com.example.dbapp.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;
@RestController
@RequestMapping("/api/commercial-invoices")
public class CommercialInvoiceController {
    @Autowired
    CommercialInvoiceRepository commercialInvoiceRepository;
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ManagerService managerService;

    @GetMapping(path = "")
    Page<CommercialInvoice> showTableContent(@RequestParam(value = "page", required = false) Optional<Integer> page) {
        if (page.isPresent()) {
            return commercialInvoiceRepository.findAll(PageRequest.of(page.get(), 10));
        } else {
            return commercialInvoiceRepository.findAll(PageRequest.of(0, 10));
        }
    }

    @GetMapping(path = "/search", params = {"search"})
    Page<CommercialInvoice> showCommercialInvoicesByNameOrSurname(@RequestParam("page") Optional<Integer> page, @RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return commercialInvoiceRepository.findWithSearch(searchLine, PageRequest.of(page.get(), 10));
        } else {
            return commercialInvoiceRepository.findWithSearch(searchLine, PageRequest.of(0, 10));
        }
    }

    @PostMapping("")
    public CommercialInvoice createCommercialInvoice(@RequestParam("product") Long productId, @RequestParam("warehouse") Long warehouseId, @RequestParam("customer") Long customerId ) {
        Product product = productRepository.findProductByProductId(productId);
        Customer customer =customerRepository.findCustomerByCustomerId(customerId);
        Warehouse warehouse = warehouseRepository.findWarehouseByWarehouseId(warehouseId);
        CommercialInvoice commercialInvoice =new CommercialInvoice(LocalDate.now(),warehouse,customer,product,managerService.getAuth());
        return commercialInvoiceRepository.save(commercialInvoice);
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteByCommercialInvoiceId(@PathVariable Long id) {
        if (commercialInvoiceRepository.findCommercialInvoiceByCommercialInvoiceId(id) != null) {
            commercialInvoiceRepository.deleteByCommercialInvoiceId(id);
            return true;
        } else {
            return false;
        }
    }
}
