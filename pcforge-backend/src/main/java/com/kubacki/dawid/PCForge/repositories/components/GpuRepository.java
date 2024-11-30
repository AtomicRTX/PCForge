package com.kubacki.dawid.PCForge.repositories.components;

import com.kubacki.dawid.PCForge.models.components.GPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GpuRepository extends JpaRepository<GPU, Integer> {

    @Query("SELECT g FROM GPU g WHERE (:tdp IS NULL OR g.tdp = :tdp) AND (:gpuSize IS NULL OR g.gpuSize <= :gpuSize) ORDER BY g.vram DESC")
    List<GPU> findCorrectGPUs(@Param("tdp") Integer tdp, @Param("gpuSize") Integer gpuSize);

    @Query("SELECT g FROM GPU g WHERE (g.vram * 1024) >= :vram AND g.rank IS NOT NULL ORDER BY g.rank DESC LIMIT 1")
    GPU getGPUToCS(@Param("vram") double vram);

    @Override
    Optional<GPU> findById(Integer id);
}
