package com.example.dbapp.repository;

import com.example.dbapp.entity.Warehouse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(path = "warehouse", collectionResourceRel = "warehouse")
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

    @Query("select w from Warehouse w")
    Page<Warehouse> findAllBy(Pageable pageable);

    @Override
    @Query("select w from Warehouse w")
    List<Warehouse> findAll();

    @Query("select w from Warehouse w where upper(w.name) like upper(?1)")
    Page<Warehouse> findWarehousesByNameLikeIgnoreCase(String name, Pageable pageable);

    @Query("select w from Warehouse w where w.warehouseId = ?1")
    Warehouse findWarehouseByWarehouseId(Long warehouseId);

    @Transactional
    @Modifying
    @Query("delete from Warehouse w where w.warehouseId = ?1")
    int deleteByWarehouseId(Long warehouseId);

    @Transactional
    @Modifying
    @Query("update Warehouse w set w.name = ?1, w.address = ?2 where w.warehouseId = ?3")
    int updateNameAndAddressByWarehouseId(String name, String address, Long warehouseId);

}