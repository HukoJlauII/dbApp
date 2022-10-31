package com.example.dbapp.repository;

import com.example.dbapp.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "products" ,collectionResourceRel = "products")    
public interface ProductRepository extends JpaRepository<Product, Long> {
}