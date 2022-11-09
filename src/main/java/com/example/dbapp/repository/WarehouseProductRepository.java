package com.example.dbapp.repository;

import com.example.dbapp.entity.Product;
import com.example.dbapp.entity.Warehouse;
import com.example.dbapp.entity.WarehouseProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;


public interface WarehouseProductRepository extends JpaRepository<WarehouseProduct, Long> {


    @Query("select w from WarehouseProduct w")
    Page<WarehouseProduct> findAllBy(Pageable pageable);

    @Query("""
            select w from WarehouseProduct w
            where upper(w.warehouse.name) like upper(?1) or upper(w.product.name) = upper(?1)""")
    Page<WarehouseProduct> findWithSearch(String name, Pageable pageable);

    @Query("select w from WarehouseProduct w where w.warehouseProductId = ?1")
    WarehouseProduct findWarehouseProductByWarehouseProductId(Long warehouseProductId);

    @Transactional
    @Modifying
    @Query("""
            update WarehouseProduct w set w.quantity = ?1, w.product = ?2, w.warehouse = ?3
            where w.warehouseProductId = ?4""")
    int updateQuantityAndProductAndWarehouseByWarehouseProductId(int quantity, Product product, Warehouse warehouse, Long warehouseProductId);

    @Transactional
    @Modifying
    @Query("delete from WarehouseProduct w where w.warehouseProductId = ?1")
    int deleteByWarehouseProductId(Long warehouseProductId);




}