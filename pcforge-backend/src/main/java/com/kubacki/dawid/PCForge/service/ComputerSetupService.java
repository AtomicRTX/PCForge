package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;

import java.util.List;

public interface ComputerSetupService {
    ComputerSetupRequest createComputerSetup(ComputerSetupRequest computerSetupRequest);
    List<ComputerSetupRequest> getComputerSetups();
    List<ComputerSetupRequest> getSimilarComputerSetups(Integer cpu_id, Integer gpu_id, Integer ram_id, Integer motherboard_id, Integer power_id, Integer case_id, Integer st_id);
    void saveComputerSetup(Integer user_id, Integer cs_id);
    boolean isSavedComputerSetup(Integer user_id, Integer cs_id);
    void deleteComputerSetup(Integer user_id, Integer cs_id);
    void rateComputerSetup(Integer user_id, Integer cs_id, Double rate);
    double[] getRatingsOfComputerSetup(Integer cs_id);
    double getRatingOfComputerSetup(Integer user_id, Integer cs_id);
    ComputerSetupRequest createComputerSetupByGames(Integer user_id,List<GameRequirements> games, List<ProgramRequirements> programs);
}
