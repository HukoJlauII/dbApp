package com.example.dbapp.repository;

import com.example.dbapp.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "suppliers" ,collectionResourceRel = "suppliers")
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}