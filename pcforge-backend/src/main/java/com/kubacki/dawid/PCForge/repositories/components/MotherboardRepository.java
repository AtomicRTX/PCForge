package com.kubacki.dawid.PCForge.repositories.components;

import com.kubacki.dawid.PCForge.models.components.Motherboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MotherboardRepository extends JpaRepository<Motherboard, Integer> {

    @Query("SELECT mb FROM Motherboard mb WHERE (:socket IS NULL OR mb.socket = :socket) AND (:capacity IS NULL OR mb.memory_capacity >= :capacity) AND (:slots IS NULL OR mb.memory_slots >= :slots) AND (:type IS NULL OR mb.memory_type = :type) AND (:form IS NULL OR mb.form_factor = :form) ORDER BY mb.name")
    List<Motherboard> findCorrectMb(@Param("socket") String socket, @Param("capacity") Integer capacity, @Param("slots") Integer slots, @Param("type") String type, @Param("form") String form);

    @Query("SELECT mb FROM Motherboard mb WHERE mb.socket = :socket AND (mb.memory_capacity*1024) >= :capacity ORDER BY mb.name LIMIT 1")
    Motherboard getMbToCS(@Param("socket") String socket, @Param("capacity") double capacity);


    @Override
    Optional<Motherboard> findById(Integer id);
}
