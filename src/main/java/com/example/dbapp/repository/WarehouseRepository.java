package com.example.dbapp.repository;

import com.example.dbapp.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "warehouse" ,collectionResourceRel = "warehouse")
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}