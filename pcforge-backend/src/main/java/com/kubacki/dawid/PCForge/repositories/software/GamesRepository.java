package com.kubacki.dawid.PCForge.repositories.software;

import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GamesRepository extends JpaRepository<GameRequirements, Integer> {
}
