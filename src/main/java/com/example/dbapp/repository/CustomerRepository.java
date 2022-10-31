package com.example.dbapp.repository;

import com.example.dbapp.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "customer" ,collectionResourceRel = "customer")
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}