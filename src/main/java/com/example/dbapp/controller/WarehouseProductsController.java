package com.example.dbapp.controller;

import com.example.dbapp.entity.Product;
import com.example.dbapp.entity.Warehouse;
import com.example.dbapp.entity.WarehouseProduct;
import com.example.dbapp.repository.ProductRepository;
import com.example.dbapp.repository.WarehouseProductRepository;
import com.example.dbapp.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/warehouse-products")
public class WarehouseProductsController {
    @Autowired
    private WarehouseProductRepository warehouseProductRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private ProductRepository productRepository;


    @GetMapping(path = "")
    Page<WarehouseProduct> showTableContent(@RequestParam(value = "page", required = false) Optional<Integer> page) {
        if (page.isPresent()) {
            return warehouseProductRepository.findAllBy(PageRequest.of(page.get(), 10));
        } else {
            return warehouseProductRepository.findAllBy(PageRequest.of(0, 10));
        }
    }

    @GetMapping(path = "/search", params = {"search"})
    Page<WarehouseProduct> showWarehouseProductsByNameOrSurname(@RequestParam("page") Optional<Integer> page, @RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return warehouseProductRepository.findWithSearch(searchLine, PageRequest.of(page.get(), 10));
        } else {
            return warehouseProductRepository.findWithSearch(searchLine, PageRequest.of(0, 10));
        }
    }

    @PostMapping("")
    public WarehouseProduct createWarehouseProduct(@RequestParam("product") Long productId, @RequestParam("warehouse") Long warehouseId, @RequestParam("quantity") int quantity) {
        Product product = productRepository.findProductByProductId(productId);
        Warehouse warehouse = warehouseRepository.findWarehouseByWarehouseId(warehouseId);
        return warehouseProductRepository.save(new WarehouseProduct(quantity, product, warehouse));
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteByWarehouseProductId(@PathVariable Long id) {
        if (warehouseProductRepository.findWarehouseProductByWarehouseProductId(id) != null) {
            warehouseProductRepository.deleteByWarehouseProductId(id);
            return true;
        } else {
            return false;
        }
    }

    @PatchMapping(value = "/{id}")
    public boolean updateWarehouseProduct(@PathVariable Long id, @RequestParam("product") Long productId, @RequestParam("warehouse") Long warehouseId, @RequestParam("quantity") int quantity) {
        if (warehouseProductRepository.findWarehouseProductByWarehouseProductId(id) != null) {
            Product product = productRepository.findProductByProductId(productId);
            Warehouse warehouse = warehouseRepository.findWarehouseByWarehouseId(warehouseId);
            warehouseProductRepository.updateQuantityAndProductAndWarehouseByWarehouseProductId(quantity, product, warehouse, id);
            return true;
        } else {
            return false;
        }
    }
}
