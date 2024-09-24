package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.components.GPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GpuRepository extends JpaRepository<GPU, Integer> {

    @Query("SELECT g FROM GPU g WHERE (:tdp IS NULL OR g.tdp = :tdp) AND (:gpuSize IS NULL OR g.gpuSize <= :gpuSize) ORDER BY g.vram")
    List<GPU> findCorrectGPUs(@Param("tdp") Integer tdp, @Param("gpuSize") Integer gpuSize);
}
