package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;

import java.util.List;

public interface SoftwareService {
    List<GameRequirements> getAllGameRequirements();
    List<ProgramRequirements> getAllProgramRequirements();
}
