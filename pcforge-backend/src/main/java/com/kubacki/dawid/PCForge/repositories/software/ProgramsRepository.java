package com.kubacki.dawid.PCForge.repositories.software;

import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramsRepository extends JpaRepository<ProgramRequirements, Integer> {
}
