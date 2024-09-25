package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.components.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Integer> {
    @Query("SELECT s FROM Storage s ORDER BY s.size DESC")
    List<Storage> findCorrectStorage();

    @Override
    Optional<Storage> findById(Integer id);
}
