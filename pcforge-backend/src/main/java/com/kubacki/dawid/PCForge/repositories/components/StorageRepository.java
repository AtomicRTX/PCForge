package com.kubacki.dawid.PCForge.repositories.components;

import com.kubacki.dawid.PCForge.models.components.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Integer> {
    @Query("SELECT s FROM Storage s ORDER BY s.size DESC")
    List<Storage> findCorrectStorage();

    @Query("SELECT s FROM Storage s WHERE s.size >= :size ORDER BY s.rank DESC LIMIT 1")
    Storage getStorageToCS(@Param("size") double size);

    @Override
    Optional<Storage> findById(Integer id);
}
