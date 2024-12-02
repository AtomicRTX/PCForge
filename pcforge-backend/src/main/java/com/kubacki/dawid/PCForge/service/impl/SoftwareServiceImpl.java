package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;
import com.kubacki.dawid.PCForge.repositories.software.GamesRepository;
import com.kubacki.dawid.PCForge.repositories.software.ProgramsRepository;
import com.kubacki.dawid.PCForge.service.SoftwareService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class SoftwareServiceImpl implements SoftwareService {

    private final GamesRepository gamesRepository;
    private final ProgramsRepository programsRepository;

    @Override
    public List<GameRequirements> getAllGameRequirements() {
        return gamesRepository.findAll();
    }

    @Override
    public List<ProgramRequirements> getAllProgramRequirements() {
        return programsRepository.findAll();
    }
}
