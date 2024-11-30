package com.kubacki.dawid.PCForge.repositories.components;


import com.kubacki.dawid.PCForge.models.components.ComputerCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ComputerCaseRepository extends JpaRepository<ComputerCase, Integer> {

    @Query("SELECT c FROM ComputerCase c WHERE (:mb IS NULL OR c.motherboard = :mb) AND (:size IS NULL OR c.gpu_size >= :size) AND (:power IS NULL OR c.power_supply = :power) ORDER BY c.name")
    List<ComputerCase> findCorrectCases(@Param("mb") String mb, @Param("size") Integer size, @Param("power") String power);

    @Query("SELECT c FROM ComputerCase c WHERE c.motherboard = :mb AND c.gpu_size >= :size AND c.power_supply = :power ORDER BY c.name LIMIT 1")
    ComputerCase getCaseToCS(@Param("mb") String mb, @Param("size") Integer size, @Param("power") String power);

    @Override
    Optional<ComputerCase> findById(Integer id);
}
