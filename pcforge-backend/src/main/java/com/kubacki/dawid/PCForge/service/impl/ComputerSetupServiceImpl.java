package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.mapper.ComputerSetupMapper;
import com.kubacki.dawid.PCForge.models.requirements.GameRequirements;
import com.kubacki.dawid.PCForge.models.requirements.ProgramRequirements;
import com.kubacki.dawid.PCForge.models.setups.ComputerSetup;
import com.kubacki.dawid.PCForge.models.setups.RatingSetup;
import com.kubacki.dawid.PCForge.models.setups.SavedSetup;
import com.kubacki.dawid.PCForge.models.users.User;
import com.kubacki.dawid.PCForge.repositories.components.*;
import com.kubacki.dawid.PCForge.repositories.setups.ComputerSetupRepository;
import com.kubacki.dawid.PCForge.repositories.setups.RatingRepository;
import com.kubacki.dawid.PCForge.repositories.setups.SavedRepository;
import com.kubacki.dawid.PCForge.repositories.users.UserRepository;
import com.kubacki.dawid.PCForge.service.ComputerSetupService;
import com.kubacki.dawid.PCForge.service.TypeEnum;
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
    private final RatingRepository ratingRepository;

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
        boolean savedSetup = savedRepository.existsByUserAndComputerSetup(user, computerSetup);
        if (!savedSetup) {
            SavedSetup s = new SavedSetup();
            s.setUser(user);
            s.setComputerSetup(computerSetup);
            savedRepository.save(s);
        }
        else{
            savedRepository.delete(savedRepository.findByUserAndComputerSetup(user, computerSetup));
        }
    }

    @Override
    public ComputerSetupRequest createComputerSetupByGames(Integer user_id,List<GameRequirements> games, List<ProgramRequirements> programs) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        double hddSpace = 0;
        double ram = 0;
        double cpuCore = 0;
        double cpuThread = 0;
        double cpuSpeed = 0;
        double gpuVram = 0;

        for (GameRequirements g : games) {
            hddSpace = hddSpace + g.getHDDSpace();
            if(g.getMinRam() > ram) ram = g.getMinRam();
            else if(g.getRecomRam() > ram) ram = g.getMinRam();
            else if(g.getMinCPUCore() > cpuCore) cpuCore = g.getMinCPUCore();
            else if(g.getRecomCPUCore() > cpuCore) cpuCore = g.getRecomCPUCore();
            else if(g.getMinCPUThread() > cpuThread) cpuThread = g.getMinCPUThread();
            else if(g.getRecomCPUThread() > cpuThread) cpuThread = g.getRecomCPUThread();
            else if(g.getMinCPUSpeed() > cpuSpeed) cpuSpeed = g.getMinCPUSpeed();
            else if(g.getRecomCPUSpeed() > cpuSpeed) cpuSpeed = g.getRecomCPUSpeed();
            else if(g.getMinGPUvram() > gpuVram) gpuVram = g.getMinGPUvram();
            else if(g.getRecomGPUvram() > gpuVram) gpuVram = g.getRecomGPUvram();
        }

        for(ProgramRequirements p : programs){
            hddSpace = hddSpace + p.getHDDSpace();
            if(p.getMinRam() > ram) ram = p.getMinRam();
            else if(p.getMinCPUCore() > cpuCore) cpuCore = p.getMinCPUCore();
            else if(p.getMinCPUThread() > cpuThread) cpuThread = p.getMinCPUThread();
            else if(p.getMinCPUSpeed() > cpuSpeed) cpuSpeed = p.getMinCPUSpeed();
            else if(p.getMinGPUvram() > gpuVram) gpuVram = p.getMinGPUvram();
        }

        var cpu = cpuRepository.getCPUToCS(cpuCore, cpuSpeed, cpuThread);
        var gpu = gpuRepository.getGPUToCS(gpuVram);
        var motherboard = motherboardRepository.getMbToCS(cpu.getSocket(), ram);
        var rams = ramRepository.getRamToCS(motherboard.getMemory_capacity(), ram, motherboard.getMemory_slots(), motherboard.getMemory_type());
        var power = powerRepository.getPowerToCS(cpu.getTdp() + gpu.getTdp() + 80 + 10 + 5);
        var storage = storageRepository.getStorageToCS(hddSpace);
        var computerCase = computerCaseRepository.getCaseToCS(motherboard.getForm_factor(), gpu.getGpuSize(), power.getSize());

        var computerSetup = ComputerSetup.builder()
                .user(user)
                .cpu(cpu)
                .gpu(gpu)
                .motherboard(motherboard)
                .power(power)
                .mem(rams)
                .storage(storage)
                .cs(computerCase)
                .build();
        ComputerSetup savedComputerSetup = computerSetupRepository.save(computerSetup);
        return ComputerSetupMapper.mapToComputerSetupRequest(savedComputerSetup);

    }

    @Override
    public boolean isSavedComputerSetup(Integer user_id, Integer cs_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        ComputerSetup computerSetup = computerSetupRepository.findById(cs_id).orElseThrow(() -> new RuntimeException("Computer setup not found."));
        return savedRepository.existsByUserAndComputerSetup(user, computerSetup);
    }

    @Override
    public void deleteComputerSetup(Integer user_id, Integer cs_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        ComputerSetup computerSetup = computerSetupRepository.findById(cs_id).orElseThrow(() -> new RuntimeException("Computer setup not found."));
        if(user == computerSetup.getUser()) {
            computerSetupRepository.deleteById(cs_id);
        }
        else if (user.getTypes().stream().anyMatch(type -> type.getName().equals(TypeEnum.ADMIN.name()))) {
            computerSetupRepository.deleteById(cs_id);
        }
    }

    @Override
    public void rateComputerSetup(Integer user_id, Integer cs_id, Double rate) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        ComputerSetup computerSetup = computerSetupRepository.findById(cs_id).orElseThrow(() -> new RuntimeException("Computer setup not found."));
        boolean ratingExist = ratingRepository.existsByUserAndComputerSetup(user, computerSetup);
        if (ratingExist) {
            RatingSetup ratingSetup = ratingRepository.findByUserAndComputerSetup(user, computerSetup);
            ratingSetup.setRating(rate);
            ratingRepository.save(ratingSetup);
        }
        else{
            RatingSetup ratingSetup = new RatingSetup();
            ratingSetup.setUser(user);
            ratingSetup.setComputerSetup(computerSetup);
            ratingSetup.setRating(rate);
            ratingRepository.save(ratingSetup);
        }
    }

    @Override
    public double[] getRatingsOfComputerSetup(Integer cs_id) {
        List<Double> ratings = ratingRepository.findRatingByComputerSetup(cs_id);
        if(ratings.isEmpty()) {
            return new double[]{0, 0};
        }
        double sum = ratings.stream().mapToDouble(Double::doubleValue).sum();
        return new double[]{sum / ratings.size(), ratings.size()};
    }

    @Override
    public double getRatingOfComputerSetup(Integer user_id, Integer cs_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        ComputerSetup computerSetup = computerSetupRepository.findById(cs_id).orElseThrow(() -> new RuntimeException("Computer setup not found."));
        return ratingRepository.findRatingByUserAndComputerSetup(user, computerSetup);
    }


}
