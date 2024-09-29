package com.kubacki.dawid.PCForge.controller;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.dto.UserDto;
import com.kubacki.dawid.PCForge.repositories.ComputerSetupRepository;
import com.kubacki.dawid.PCForge.service.ComputerSetupService;
import com.kubacki.dawid.PCForge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/computer")
@RequiredArgsConstructor

public class ComputerSetupController {
    private final ComputerSetupService computerSetupService;
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<ComputerSetupRequest> addComputer(@RequestBody ComputerSetupRequest computerSetupRequest) {
        ComputerSetupRequest savedComputerSetup = computerSetupService.createComputerSetup(computerSetupRequest);
        return new ResponseEntity<>(savedComputerSetup, HttpStatus.CREATED);
    }
    @GetMapping("/all")
    public ResponseEntity<List<ComputerSetupRequest>> getAllComputers() {
        List<ComputerSetupRequest> computerSetupRequests = computerSetupService.getComputerSetups();
        return new ResponseEntity<>(computerSetupRequests, HttpStatus.OK);
    }
    @PostMapping("/{id}/save")
    public ResponseEntity<ComputerSetupRequest> saveComputer(@PathVariable int id) {
        UserDto userDto = userService.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        computerSetupService.saveComputerSetup(userDto.getUser_id(), id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}/checkSave")
    public ResponseEntity<Boolean> checkSaveComputer(@PathVariable int id) {
        UserDto userDto = userService.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        return new ResponseEntity<>(computerSetupService.isSavedComputerSetup(userDto.getUser_id(), id), HttpStatus.OK);
    }
}
