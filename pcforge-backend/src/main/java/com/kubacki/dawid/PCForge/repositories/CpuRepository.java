package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.components.CPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CpuRepository extends JpaRepository<CPU, Integer> {

    @Query("SELECT c FROM CPU c WHERE (:tdp IS NULL OR c.tdp = :tdp) AND (:socket IS NULL OR c.socket = :socket) ORDER BY c.threads")
    List<CPU> findCorrectCPUs(@Param("tdp") Integer tdp, @Param("socket") String socket);
}
