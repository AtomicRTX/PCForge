package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.components.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StorageRepository extends JpaRepository<Storage, Integer> {
    @Query("SELECT s FROM Storage s ORDER BY s.name")
    List<Storage> findCorrectStorage();
}
