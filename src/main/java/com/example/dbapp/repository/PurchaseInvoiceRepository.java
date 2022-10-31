package com.example.dbapp.repository;

import com.example.dbapp.entity.PurchaseInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "purchase_invoice" ,collectionResourceRel = "purchase_invoice")
public interface PurchaseInvoiceRepository extends JpaRepository<PurchaseInvoice, Long> {

}