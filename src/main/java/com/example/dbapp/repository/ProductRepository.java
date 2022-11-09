package com.example.dbapp.repository;

import com.example.dbapp.entity.Product;
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
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select p from Product p")
    Page<Product> findAllBy(Pageable pageable);

    @Query("select p from Product p")
    @Override
    List<Product> findAll();

    @Query("select p from Product p where upper(p.name) like upper(?1)")
    Page<Product> findProductsByNameLikeIgnoreCase(String name, Pageable pageable);

    @Query("select p from Product p where p.productId = ?1")
    Product findProductByProductId(Long productId);

    @Transactional
    @Modifying
    @Query("delete from Product p where p.productId = ?1")
    void deleteByProductId(Long productId);

    @Transactional
    @Modifying
    @Query("""
            update Product p set p.name = ?1, p.price = ?2, p.unit = ?3, p.producer = ?4, p.description = ?5
            where p.productId = ?6""")
    void updateNameAndPriceAndUnitAndProducerAndDescriptionByProductId(String name, int price, String unit, String producer, String description, Long productId);


}