package com.kubacki.dawid.PCForge.controller;


import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;
import com.kubacki.dawid.PCForge.service.SoftwareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/software")
@RequiredArgsConstructor

public class SoftwareController {
    private final SoftwareService softwareService;

    @GetMapping("/games")
    public ResponseEntity<List<GameRequirements>> getAllGames() {
        List<GameRequirements> gameRequirements = softwareService.getAllGameRequirements();
        return new ResponseEntity<>(gameRequirements, HttpStatus.OK);
    }

    @GetMapping("/programs")
    public ResponseEntity<List<ProgramRequirements>> getAllPrograms() {
        List<ProgramRequirements> programRequirements = softwareService.getAllProgramRequirements();
        return new ResponseEntity<>(programRequirements, HttpStatus.OK);
    }

}