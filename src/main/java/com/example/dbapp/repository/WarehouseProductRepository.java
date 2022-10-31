package com.example.dbapp.repository;

import com.example.dbapp.entity.WarehouseProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "warehouse_product" ,collectionResourceRel = "warehouse_product")
public interface WarehouseProductRepository extends JpaRepository<WarehouseProduct, Long> {
}