package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.dto.components.*;

import java.util.List;

public interface ComponentService {
    List<CpuDto> getCorrectCPUs(Integer tdp, String socket);
    List<GpuDto> getCorrectGPUs(Integer tdp, Integer gpuSize);
    List<MotherboardDto> getCorrectMotherboards(String socket, Integer capacity, Integer slots, String type, String form);
    List<RamDto> getCorrectRams(Integer size, Integer sticks, String type);
    List<ComputerCaseDto> getCorrectCases(String mb, Integer size, String power);
    List<PowerDto> getCorrectPowers(Integer watt, String size);
    List<StorageDto> getCorrectStorages();

    CpuDto getCPUbyId(Integer id);
    GpuDto getGPUbyId(Integer id);
    MotherboardDto getMotherboardbyId(Integer id);
    RamDto getRambyId(Integer id);
    StorageDto getStoragebyId(Integer id);
    PowerDto getPowerbyId(Integer id);
    ComputerCaseDto getComputerCasebyId(Integer id);
}
