package com.kubacki.dawid.PCForge.mapper;

import java.util.List;

import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;


public class ComputerSetupRequestWrapper {
    private List<GameRequirements> games;
    private List<ProgramRequirements> programs;

    public List<GameRequirements> getGames() {
        return games;
    }

    public void setGames(List<GameRequirements> games) {
        this.games = games;
    }

    public List<ProgramRequirements> getPrograms() {
        return programs;
    }

    public void setPrograms(List<ProgramRequirements> programs) {
        this.programs = programs;
    }
}