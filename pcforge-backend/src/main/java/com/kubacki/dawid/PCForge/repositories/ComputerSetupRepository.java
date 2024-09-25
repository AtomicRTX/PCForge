package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComputerSetupRepository extends JpaRepository<ComputerSetup, Integer> {
}
