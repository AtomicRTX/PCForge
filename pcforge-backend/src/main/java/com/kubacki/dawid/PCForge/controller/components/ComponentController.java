package com.kubacki.dawid.PCForge.controller.components;

import com.kubacki.dawid.PCForge.dto.components.*;
import com.kubacki.dawid.PCForge.service.ComponentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/component")
@RequiredArgsConstructor

public class ComponentController {
    private final ComponentService componentService;

    @GetMapping("/setcpu")
    public ResponseEntity<List<CpuDto>> getCorrectCPU(@RequestParam(value = "tdp", required = false) Integer tdp, @RequestParam(value = "socket", required = false) String socket) {
        List<CpuDto> cpuDtos = componentService.getCorrectCPUs(tdp, socket);
        return ResponseEntity.ok(cpuDtos);
    }

    @GetMapping("/setgpu")
    public ResponseEntity<List<GpuDto>> getCorrectGPU(@RequestParam(value = "tdp", required = false) Integer tdp, @RequestParam(value = "gpuSize", required = false) Integer gpuSize) {
        List<GpuDto> gpuDtos = componentService.getCorrectGPUs(tdp, gpuSize);
        return ResponseEntity.ok(gpuDtos);
    }

    @GetMapping("/setmb")
    public ResponseEntity<List<MotherboardDto>> getCorrectMotherboard(@RequestParam(value = "socket", required = false) String socket, @RequestParam(value = "capacity", required = false) Integer capacity, @RequestParam(value = "slots", required = false) Integer slots, @RequestParam(value = "type", required = false) String type, @RequestParam(value = "form", required = false) String form) {
        List<MotherboardDto> motherboardDtos = componentService.getCorrectMotherboards(socket, capacity, slots, type, form);
        return ResponseEntity.ok(motherboardDtos);
    }

    @GetMapping("/setram")
    public ResponseEntity<List<RamDto>> getCorrectRam(@RequestParam(value = "size", required = false) Integer size, @RequestParam(value = "sticks", required = false) Integer sticks, @RequestParam(value = "type", required = false) String type) {
        List<RamDto> ramDtos = componentService.getCorrectRams(size, sticks, type);
        return ResponseEntity.ok(ramDtos);
    }

    @GetMapping("/setcase")
    public ResponseEntity<List<ComputerCaseDto>> getCorrectCase(@RequestParam(value = "mb", required = false) String mb, @RequestParam(value = "size", required = false) Integer size, @RequestParam(value = "power", required = false) String power) {
        List<ComputerCaseDto> computerCaseDtos = componentService.getCorrectCases(mb, size, power);
        return ResponseEntity.ok(computerCaseDtos);
    }
    @GetMapping("/setpower")
    public ResponseEntity<List<PowerDto>> getCorrectPower(@RequestParam(value = "watt", required = false) Integer watt, @RequestParam(value = "size", required = false) String size) {
        List<PowerDto> powerDtos = componentService.getCorrectPowers(watt, size);
        return ResponseEntity.ok(powerDtos);
    }
    @GetMapping("/setstorage")
    public ResponseEntity<List<StorageDto>> getCorrectStorage() {
        List<StorageDto> storageDtos = componentService.getCorrectStorages();
        return ResponseEntity.ok(storageDtos);
    }
}
