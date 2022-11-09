package com.example.dbapp.controller;


import com.example.dbapp.entity.Product;
import com.example.dbapp.entity.Warehouse;
import com.example.dbapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping(path = "")
    Page<Product> showTableContent(@RequestParam(value = "page",required = false) Optional<Integer> page) {
        if (page.isPresent()) {
            return productRepository.findAllBy(PageRequest.of(page.get(), 10));
        }
        else {
            return productRepository.findAllBy(PageRequest.of(0, 10));
        }
    }

    @GetMapping(path = "/search", params = {"search"})
    Page<Product> showProductsByNameOrSurname(@RequestParam("page") Optional<Integer> page, @RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return productRepository.findProductsByNameLikeIgnoreCase(searchLine, PageRequest.of(page.get(), 10));
        }
        else {
            return productRepository.findProductsByNameLikeIgnoreCase(searchLine, PageRequest.of(0, 10));
        }
    }

    @GetMapping("/{id}")
    Product showProductById(@PathVariable Long id)
    {
        return productRepository.findProductByProductId(id);
    }

    @PostMapping("")
    public Product createProduct(@RequestBody Product product) {

        return productRepository.save(product);
    }

    @GetMapping("/all")
    List<Product> showAllWarehouses()
    {
        return productRepository.findAll();
    }


    @DeleteMapping(path = "/{id}")
    public boolean deleteByProductId(@PathVariable Long id) {
        if (productRepository.findProductByProductId(id) != null) {
            productRepository.deleteByProductId(id);
            return true;
        } else {
            return false;
        }
    }

    @PatchMapping(value = "/{id}")
    public boolean updateProduct(@PathVariable Long id, @RequestBody Product product) {
        if (productRepository.findProductByProductId(id) != null) {
            productRepository.updateNameAndPriceAndUnitAndProducerAndDescriptionByProductId(product.getName(), product.getPrice(), product.getUnit(), product.getProducer(), product.getDescription(), id);
            return true;
        } else {
            return false;
        }
    }

}
