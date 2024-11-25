package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;

import java.util.List;

public interface ComputerSetupService {
    ComputerSetupRequest createComputerSetup(ComputerSetupRequest computerSetupRequest);
    List<ComputerSetupRequest> getComputerSetups();
    void saveComputerSetup(Integer user_id, Integer cs_id);
    boolean isSavedComputerSetup(Integer user_id, Integer cs_id);
    void deleteComputerSetup(Integer user_id, Integer cs_id);
    void ratingComputerSetup(Integer user_id, Integer cs_id, float rate);
    double[] getRatingsOfComputerSetup(Integer cs_id);
}
