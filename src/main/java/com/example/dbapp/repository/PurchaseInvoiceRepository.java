package com.example.dbapp.repository;

import com.example.dbapp.entity.PurchaseInvoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RepositoryRestResource(path = "purchase_invoice", collectionResourceRel = "purchase_invoice")
public interface PurchaseInvoiceRepository extends JpaRepository<PurchaseInvoice, Long> {
    @Query("select p from PurchaseInvoice p where p.purchaseInvoiceId = ?1")
    PurchaseInvoice findPurchaseInvoiceByPurchaseInvoiceId(Long purchaseInvoiceId);

    @Query("select p from PurchaseInvoice p")
    @Override
    Page<PurchaseInvoice> findAll(Pageable pageable);

    @Query("""
            select p from PurchaseInvoice p
            where p.warehouse.name = ?1 or p.manager.name = ?1 or p.manager.surname = ?1 or p.supplier.name = ?1 or p.product.name = ?1""")
    Page<PurchaseInvoice> findWithSearch(String name, Pageable pageable);

    @Transactional
    @Modifying
    @Query("delete from PurchaseInvoice p where p.purchaseInvoiceId = ?1")
    int deleteByPurchaseInvoiceId(Long purchaseInvoiceId);




}