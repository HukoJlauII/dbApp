package com.example.dbapp.controller;


import com.example.dbapp.entity.Product;
import com.example.dbapp.entity.Warehouse;
import com.example.dbapp.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {
    @Autowired
    private WarehouseRepository warehouseRepository;


    @GetMapping(path = "")
    Page<Warehouse> showTableContent(@RequestParam(value = "page",required = false) Optional<Integer> page) {
        if (page.isPresent()) {
            return warehouseRepository.findAllBy(PageRequest.of(page.get(), 10));
        }
        else {
            return warehouseRepository.findAllBy(PageRequest.of(0, 10));
        }
    }

    @GetMapping("/{id}")
    Warehouse showProductById(@PathVariable Long id)
    {
        return warehouseRepository.findWarehouseByWarehouseId(id);
    }

    @GetMapping("/all")
    List<Warehouse> showAllWarehouses()
    {
        return warehouseRepository.findAll();
    }

    @GetMapping(path = "/search", params = {"search"})
    Page<Warehouse> showWarehousesByNameOrSurname(@RequestParam("page") Optional<Integer> page, @RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return warehouseRepository.findWarehousesByNameLikeIgnoreCase(searchLine, PageRequest.of(page.get(), 10));
        }
        else {
            return warehouseRepository.findWarehousesByNameLikeIgnoreCase(searchLine, PageRequest.of(0, 10));
        }
    }

    @PostMapping("")
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {

        return warehouseRepository.save(warehouse);
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteByWarehouseId(@PathVariable Long id) {
        if (warehouseRepository.findWarehouseByWarehouseId(id) != null) {
            warehouseRepository.deleteByWarehouseId(id);
            return true;
        } else {
            return false;
        }
    }

    @PatchMapping(value = "/{id}")
    public boolean updateWarehouse(@PathVariable Long id, @RequestBody Warehouse warehouse) {
        if (warehouseRepository.findWarehouseByWarehouseId(id) != null) {
            warehouseRepository.updateNameAndAddressByWarehouseId(warehouse.getName(), warehouse.getAddress(), id);
            return true;
        } else {
            return false;
        }
    }
}
