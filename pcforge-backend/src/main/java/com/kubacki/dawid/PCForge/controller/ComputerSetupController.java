package com.kubacki.dawid.PCForge.controller;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.service.ComputerSetupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/computer")
@RequiredArgsConstructor

public class ComputerSetupController {
    private final ComputerSetupService computerSetupService;

    @PostMapping("/add")
    public ResponseEntity<ComputerSetupRequest> addComputer(@RequestBody ComputerSetupRequest computerSetupRequest) {
        ComputerSetupRequest savedComputerSetup = computerSetupService.createComputerSetup(computerSetupRequest);
        return new ResponseEntity<>(savedComputerSetup, HttpStatus.CREATED);
    }
}
