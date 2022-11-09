package com.example.dbapp.controller;

import com.example.dbapp.entity.Customer;
import com.example.dbapp.entity.Supplier;
import com.example.dbapp.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/suppliers")
public class SuppliersController {
    @Autowired
    private SupplierRepository supplierRepository;


    @GetMapping(path = "")
    Page<Supplier> showTableContent(@RequestParam(value = "page",required = false) Optional<Integer> page) {
        if (page.isPresent()) {
            return supplierRepository.findAllBy(PageRequest.of(page.get(), 10));
        }
        else {
            return supplierRepository.findAllBy(PageRequest.of(0, 10));
        }
    }
    @GetMapping("/all")
    public List<Supplier> showAllCustomers() {
        return supplierRepository.findAll();
    }

    @GetMapping(path = "/search", params = {"search"})
    Page<Supplier> showSuppliersByNameOrSurname(@RequestParam("page") Optional<Integer> page, @RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return supplierRepository.findSuppliersByNameLikeIgnoreCase(searchLine, PageRequest.of(page.get(), 10));
        }
        else {
            return supplierRepository.findSuppliersByNameLikeIgnoreCase(searchLine, PageRequest.of(0, 10));
        }
    }

    @PostMapping("")
    public Supplier createSupplier(@RequestBody Supplier supplier) {

        return supplierRepository.save(supplier);
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteBySupplierId(@PathVariable Long id) {
        if (supplierRepository.findSupplierBySupplierId(id) != null) {
            supplierRepository.deleteBySupplierId(id);
            return true;
        } else {
            return false;
        }
    }

    @PatchMapping(value = "/{id}")
    public boolean updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        if (supplierRepository.findSupplierBySupplierId(id) != null) {
            supplierRepository.updateNameAndRequisitesBySupplierId(supplier.getName(), supplier.getRequisites(), id);
            return true;
        } else {
            return false;
        }
    }
}
