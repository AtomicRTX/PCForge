package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.dto.components.*;
import com.kubacki.dawid.PCForge.mapper.components.*;
import com.kubacki.dawid.PCForge.models.components.*;
import com.kubacki.dawid.PCForge.repositories.*;
import com.kubacki.dawid.PCForge.service.ComponentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class ComponentServiceImpl implements ComponentService {

    private final CpuRepository cpuRepository;
    private final GpuRepository gpuRepository;
    private final MotherboardRepository motherboardRepository;
    private final RamRepository ramRepository;
    private final ComputerCaseRepository computerCaseRepository;
    private final PowerRepository powerRepository;
    private final StorageRepository storageRepository;

    @Override
    public List<CpuDto> getCorrectCPUs(Integer tdp, String socket) {
        List<CPU> correctCPUs = cpuRepository.findCorrectCPUs(tdp, socket);
        return correctCPUs.stream().map(cpu -> CpuMapper.mapToCpuDto(cpu)).collect(Collectors.toList());
    }

    @Override
    public List<GpuDto> getCorrectGPUs(Integer tdp, Integer gpuSize) {
        List<GPU> correctGPUs = gpuRepository.findCorrectGPUs(tdp, gpuSize);
        return correctGPUs.stream().map(gpu -> GpuMapper.mapToGpuDto(gpu)).collect(Collectors.toList());
    }

    @Override
    public List<MotherboardDto> getCorrectMotherboards(String socket, Integer capacity, Integer slots, String type, String form) {
        List<Motherboard> correctMbs = motherboardRepository.findCorrectMb(socket,capacity,slots,type,form);
        return correctMbs.stream().map(motherboard -> MotherboardMapper.mapToMotherboardDto(motherboard)).collect(Collectors.toList());
    }

    @Override
    public List<RamDto> getCorrectRams(Integer size, Integer sticks, String type) {
        List<RAM> correctRams = ramRepository.findCorrectRam(size,sticks,type);
        return correctRams.stream().map(ram -> RamMapper.mapToRamDto(ram)).collect(Collectors.toList());
    }

    @Override
    public List<ComputerCaseDto> getCorrectCases(String mb, Integer size, String power) {
        List<ComputerCase> correctComputerCases = computerCaseRepository.findCorrectCases(mb, size, power);
        return correctComputerCases.stream().map(c -> ComputerCaseMapper.mapToCaseDto(c)).collect(Collectors.toList());
    }

    @Override
    public List<PowerDto> getCorrectPowers(Integer watt, String size) {
        List<Power> correctPower = powerRepository.findCorrectPowers(watt, size);
        return correctPower.stream().map(p -> PowerMapper.mapToPowerDto(p)).collect(Collectors.toList());
    }

    @Override
    public List<StorageDto> getCorrectStorages() {
        List<Storage> correctStorage = storageRepository.findCorrectStorage();
        return correctStorage.stream().map(st -> StorageMapper.mapToStorageDto(st)).collect(Collectors.toList());
    }
}
