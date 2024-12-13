package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.mapper.ComputerSetupMapper;
import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;
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

import java.util.ArrayList;
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
    public List<ComputerSetupRequest> getSimilarComputerSetups(Integer cpu_id, Integer gpu_id, Integer ram_id, Integer motherboard_id, Integer power_id, Integer case_id, Integer st_id) {
        List<ComputerSetup> computerSetups = computerSetupRepository.getSimilarComputerSetups(cpu_id, gpu_id, ram_id, motherboard_id, power_id, case_id, st_id);
        List<ComputerSetup> result = new ArrayList<>();
        System.out.println(computerSetups.size());
        for (ComputerSetup computerSetup : computerSetups) {
            double[] ratings = getRatingsOfComputerSetup(computerSetup.getCs_id());
            if (ratings[0] > 4) {
                result.add(computerSetup);
            }
            if (result.size() >= 2) {
                break;
            }
        }
        return result.stream().map((computerSetup -> ComputerSetupMapper.mapToComputerSetupRequest(computerSetup))).collect(Collectors.toList());
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
            hddSpace = hddSpace + g.getHdd_space();
            if(g.getMin_ram() > ram) ram = g.getMin_ram();
            else if(g.getRecom_ram() > ram) ram = g.getMin_ram();
            else if(g.getMin_cpu_cores() > cpuCore) cpuCore = g.getMin_cpu_cores();
            else if(g.getRecom_cpu_cores() > cpuCore) cpuCore = g.getRecom_cpu_cores();
            else if(g.getMin_cpu_threads() > cpuThread) cpuThread = g.getMin_cpu_threads();
            else if(g.getRecom_cpu_threads() > cpuThread) cpuThread = g.getRecom_cpu_threads();
            else if(g.getMin_cpu_speed() > cpuSpeed) cpuSpeed = g.getMin_cpu_speed();
            else if(g.getRecom_cpu_speed() > cpuSpeed) cpuSpeed = g.getRecom_cpu_speed();
            else if(g.getMin_gpu_vram() > gpuVram) gpuVram = g.getMin_gpu_vram();
            else if(g.getRecom_gpu_vram() > gpuVram) gpuVram = g.getRecom_gpu_vram();
        }

        for(ProgramRequirements p : programs){
            hddSpace = hddSpace + p.getHdd_space();
            if(p.getMin_ram() > ram) ram = p.getMin_ram();
            else if(p.getMin_cpu_cores() > cpuCore) cpuCore = p.getMin_cpu_cores();
            else if(p.getMin_cpu_threads() > cpuThread) cpuThread = p.getMin_cpu_threads();
            else if(p.getMin_cpu_speed() > cpuSpeed) cpuSpeed = p.getMin_cpu_speed();
            else if(p.getMin_gpu_vram() > gpuVram) gpuVram = p.getMin_gpu_vram();
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
