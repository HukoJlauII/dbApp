package com.example.dbapp.repository;

import com.example.dbapp.entity.Customer;
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
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("select c from Customer c where c.customerId = ?1")
    Customer findCustomerByCustomerId(Long id);

    @Query("select c from Customer c")
    Page<Customer> findAllBy(Pageable pageable);

    @Query("select c from Customer c")
    @Override
    List<Customer> findAll();

    @Query("select c from Customer c where upper(c.name) like upper(?1) or upper(c.surname) like upper(?1)")
    Page<Customer> findCustomersWithSearch(String name ,Pageable pageable);

    @Transactional
    @Modifying
    @Query("delete from Customer c where c.customerId = ?1")
    int deleteByCustomerId(Long customerId);

    @Transactional
    @Modifying
    @Query("update Customer c set c.name = ?1, c.surname = ?2, c.discount = ?3, c.city = ?4 where c.customerId = ?5")
    int updateNameAndSurnameAndDiscountAndCityByCustomerId(String name, String surname, int discount, String city, Long customerId);





}