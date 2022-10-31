package com.example.dbapp.repository;

import com.example.dbapp.entity.CommercialInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "commercial_invoice" ,collectionResourceRel = "commercial_invoice")
public interface CommercialInvoiceRepository extends JpaRepository<CommercialInvoice, Long> {
}