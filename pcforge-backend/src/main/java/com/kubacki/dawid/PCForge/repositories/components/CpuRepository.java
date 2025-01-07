package com.kubacki.dawid.PCForge.repositories.components;

import com.kubacki.dawid.PCForge.models.components.CPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CpuRepository extends JpaRepository<CPU, Integer> {

    @Query("SELECT c FROM CPU c WHERE (:tdp IS NULL OR c.tdp = :tdp) AND (:socket IS NULL OR c.socket = :socket) ORDER BY c.threads DESC")
    List<CPU> findCorrectCPUs(@Param("tdp") Integer tdp, @Param("socket") String socket);

    @Query("SELECT c FROM CPU c WHERE c.cores >= :core AND c.base_clock >= :speed AND c.threads >= :thread AND c.rank IS NOT NULL ORDER BY c.rank DESC LIMIT 1")
    CPU getCPUToCS(@Param("core") double core, @Param("speed") double speed, @Param("thread") double thread);

    @Override
    Optional<CPU> findById(Integer id);
}
