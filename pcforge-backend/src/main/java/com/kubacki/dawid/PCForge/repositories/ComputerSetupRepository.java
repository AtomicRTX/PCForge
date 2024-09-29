package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComputerSetupRepository extends JpaRepository<ComputerSetup, Integer> {

    @Query("SELECT cs FROM ComputerSetup cs")
    List<ComputerSetup> getComputerSetups();

}
