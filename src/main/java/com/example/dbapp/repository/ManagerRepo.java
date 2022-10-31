package com.example.dbapp.repository;

import com.example.dbapp.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "managers" ,collectionResourceRel = "managers")
public interface ManagerRepo extends JpaRepository<Manager,Long> {
    Manager findManagerByEmail(String email);
}
