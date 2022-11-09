package com.example.dbapp.repository;

import com.example.dbapp.entity.Manager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ManagerRepository extends JpaRepository<Manager,Long> {
    @Query("select m from Manager m where m.email = ?1")
    Manager findManagerByEmail(String email);

    @Query("select m from Manager m where m.managerId = ?1")
    Manager findManagersByManagerId(Long managerId);

    @Query("select m from Manager m")
    Page<Manager> findAllBy(@PageableDefault Pageable pageable);


    @Query("select m from Manager m where upper(m.name) like upper(?1) or upper(m.surname) like upper(?1)")
    Page<Manager> findManagersWithSearch(String name, Pageable pageable);

    @Transactional
    @Modifying
    @Query("update Manager m set m.name = ?1, m.surname = ?2, m.email = ?3, m.telephone = ?4 where m.managerId = ?5")
    void updateNameAndSurnameAndEmailAndTelephoneByManagerId(String name, String surname, String email, String telephone, Long managerId);

    @Transactional
    @Modifying
    @Query("delete from Manager m where m.managerId = ?1")
    void deleteByManagerId(Long managerId);


}
