package com.kubacki.dawid.PCForge.repositories.components;

import com.kubacki.dawid.PCForge.models.components.Power;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PowerRepository extends JpaRepository<Power, Integer> {
    @Query("SELECT p FROM Power p WHERE (:watt IS NULL OR p.watt = :watt) AND (:size IS NULL OR p.size = :size) ORDER BY p.watt DESC")
    List<Power> findCorrectPowers(@Param("watt") Integer watt, @Param("size") String size);

    @Override
    Optional<Power> findById(Integer id);
}
