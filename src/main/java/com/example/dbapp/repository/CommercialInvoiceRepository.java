package com.example.dbapp.repository;

import com.example.dbapp.entity.CommercialInvoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RepositoryRestResource(path = "commercial_invoice" ,collectionResourceRel = "commercial_invoice")
public interface CommercialInvoiceRepository extends JpaRepository<CommercialInvoice, Long> {

    @Query("select c from CommercialInvoice c where c.commercialInvoiceId = ?1")
    CommercialInvoice findCommercialInvoiceByCommercialInvoiceId(Long commecialInvoiceId);

    @Query("select c from CommercialInvoice c")
    Page<CommercialInvoice> findAllBy(Pageable pageable);

    @Query("""
            select c from CommercialInvoice c
            where c.warehouse.name like ?1 or c.manager.name like ?1 or c.manager.surname like ?1 or c.product.name like ?1 or c.customer.city = ?1""")
    Page<CommercialInvoice> findWithSearch(String name,Pageable pageable);

    @Transactional
    @Modifying
    @Query("delete from CommercialInvoice c where c.commercialInvoiceId = ?1")
    int deleteByCommercialInvoiceId(Long commercialInvoiceId);






}