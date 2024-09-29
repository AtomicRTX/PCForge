package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.mapper.ComputerSetupMapper;
import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;
import com.kubacki.dawid.PCForge.models.setups.SavedSetup;
import com.kubacki.dawid.PCForge.models.users.User;
import com.kubacki.dawid.PCForge.repositories.*;
import com.kubacki.dawid.PCForge.service.ComputerSetupService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class ComputerSetupServiceImpl implements ComputerSetupService {

    private final ComputerCaseRepository computerCaseRepository;
    private final CpuRepository cpuRepository;
    private final GpuRepository gpuRepository;
    private final MotherboardRepository motherboardRepository;
    private final PowerRepository powerRepository;
    private final RamRepository ramRepository;
    private final StorageRepository storageRepository;
    private final UserRepository userRepository;
    private final ComputerSetupRepository computerSetupRepository;
    private final SavedRepository savedRepository;

    @Override
    public ComputerSetupRequest createComputerSetup(ComputerSetupRequest computerSetupRequest) {
        var userOptional = userRepository.findById(computerSetupRequest.getUser_id());
        var cpuOptional = cpuRepository.findById(computerSetupRequest.getCpu_id());
        var gpuOptional = gpuRepository.findById(computerSetupRequest.getGpu_id());
        var motherboardOptional = motherboardRepository.findById(computerSetupRequest.getMb_id());
        var powerOptional = powerRepository.findById(computerSetupRequest.getPower_id());
        var ramOptional = ramRepository.findById(computerSetupRequest.getRam_id());
        var storageOptional = storageRepository.findById(computerSetupRequest.getSt_id());
        var computerCaseOptional = computerCaseRepository.findById(computerSetupRequest.getCase_id());

        var computerSetup = ComputerSetup.builder()
                .user(userOptional.get())
                .cpu(cpuOptional.get())
                .gpu(gpuOptional.get())
                .motherboard(motherboardOptional.get())
                .power(powerOptional.get())
                .mem(ramOptional.get())
                .storage(storageOptional.get())
                .cs(computerCaseOptional.get())
                .build();
        ComputerSetup savedComputerSetup = computerSetupRepository.save(computerSetup);
        return ComputerSetupMapper.mapToComputerSetupRequest(savedComputerSetup);
    }

    @Override
    public List<ComputerSetupRequest> getComputerSetups() {
        List<ComputerSetup> computerSetups = computerSetupRepository.getComputerSetups();
        return computerSetups.stream().map((computerSetup -> ComputerSetupMapper.mapToComputerSetupRequest(computerSetup))).collect(Collectors.toList());
    }

    @Override
    public void saveComputerSetup(Integer user_id, Integer cs_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        ComputerSetup computerSetup = computerSetupRepository.findById(cs_id).orElseThrow(() -> new RuntimeException("Computer setup not found."));
        SavedSetup savedSetup = savedRepository.findByUserAndComputerSetup(user, computerSetup);
        if (savedSetup != null) {
            savedRepository.delete(savedSetup);
        }
        else{
            SavedSetup s = new SavedSetup();
            s.setUser(user);
            s.setComputerSetup(computerSetup);
            savedRepository.save(s);
        }
    }

    @Override
    public boolean isSavedComputerSetup(Integer user_id, Integer cs_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        ComputerSetup computerSetup = computerSetupRepository.findById(cs_id).orElseThrow(() -> new RuntimeException("Computer setup not found."));
        return savedRepository.existsByUserAndComputerSetup(user, computerSetup);
    }
}
