package com.example.dbapp.repository;

import com.example.dbapp.entity.Supplier;
import com.example.dbapp.entity.Warehouse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {


    @Query("select s from Supplier s")
    Page<Supplier> findAllBy(Pageable pageable);

    @Query("select s from Supplier s")
    @Override
    List<Supplier> findAll();

    @Query("select s from Supplier s where upper(s.name) like upper(?1)")
    Page<Supplier> findSuppliersByNameLikeIgnoreCase(String name, Pageable pageable);

    @Query("select s from Supplier s where s.supplierId = ?1")
    Supplier findSupplierBySupplierId(Long supplierId);

    long deleteBySupplierId(Long supplierId);

    @Transactional
    @Modifying
    @Query("update Supplier s set s.name = ?1, s.requisites = ?2 where s.supplierId = ?3")
    int updateNameAndRequisitesBySupplierId(String name, String requisites, Long supplierId);




}