package com.example.dbapp.controller;

import com.example.dbapp.entity.Product;
import com.example.dbapp.entity.Supplier;
import com.example.dbapp.entity.Warehouse;
import com.example.dbapp.entity.PurchaseInvoice;
import com.example.dbapp.repository.ProductRepository;
import com.example.dbapp.repository.PurchaseInvoiceRepository;
import com.example.dbapp.repository.SupplierRepository;
import com.example.dbapp.repository.WarehouseRepository;
import com.example.dbapp.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/purchase-invoices")
public class PurchaseInvoiceController {
    @Autowired
    PurchaseInvoiceRepository purchaseInvoiceRepository;
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private SupplierRepository supplierRepository;
    
    @Autowired
    private ManagerService managerService;


    @GetMapping(path = "")
    Page<PurchaseInvoice> showTableContent(@RequestParam(value = "page", required = false) Optional<Integer> page) {
        if (page.isPresent()) {
            return purchaseInvoiceRepository.findAll(PageRequest.of(page.get(), 10));
        } else {
            return purchaseInvoiceRepository.findAll(PageRequest.of(0, 10));
        }
    }

    @GetMapping(path = "/search", params = {"search"})
    Page<PurchaseInvoice> showPurchaseInvoicesByNameOrSurname(@RequestParam("page") Optional<Integer> page, @RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return purchaseInvoiceRepository.findWithSearch(searchLine, PageRequest.of(page.get(), 10));
        } else {
            return purchaseInvoiceRepository.findWithSearch(searchLine, PageRequest.of(0, 10));
        }
    }

    @PostMapping("")
    public PurchaseInvoice createPurchaseInvoice(@RequestParam("product") Long productId, @RequestParam("warehouse") Long warehouseId, @RequestParam("supplier") Long supplierId ) {
        Product product = productRepository.findProductByProductId(productId);
        Supplier supplier=supplierRepository.findSupplierBySupplierId(supplierId);
        Warehouse warehouse = warehouseRepository.findWarehouseByWarehouseId(warehouseId);
        return purchaseInvoiceRepository.save(new PurchaseInvoice(LocalDateTime.now(),warehouse,supplier,product,managerService.getAuth()));
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteByPurchaseInvoiceId(@PathVariable Long id) {
        if (purchaseInvoiceRepository.findPurchaseInvoiceByPurchaseInvoiceId(id) != null) {
            purchaseInvoiceRepository.deleteByPurchaseInvoiceId(id);
            return true;
        } else {
            return false;
        }
    }

}
