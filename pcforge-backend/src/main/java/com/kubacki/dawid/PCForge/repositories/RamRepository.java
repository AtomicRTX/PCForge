package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.components.RAM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RamRepository extends JpaRepository<RAM, Integer> {

    @Query("SELECT r FROM RAM r WHERE (:size IS NULL OR r.size <= :size) AND (:sticks IS NULL OR r.sticks <= :sticks) AND (:type IS NULL OR r.ram_type = :type) ORDER BY r.name")
    List<RAM> findCorrectRam(@Param("size") Integer size, @Param("sticks") Integer sticks, @Param("type") String type);

    @Override
    Optional<RAM> findById(Integer id);
}
