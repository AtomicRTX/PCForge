package com.kubacki.dawid.PCForge.controller;

import com.kubacki.dawid.PCForge.dto.ComputerSetupRequest;
import com.kubacki.dawid.PCForge.dto.RatingRequest;
import com.kubacki.dawid.PCForge.dto.SimilarSetupDto;
import com.kubacki.dawid.PCForge.dto.UserDto;
import com.kubacki.dawid.PCForge.models.software.GameRequirements;
import com.kubacki.dawid.PCForge.models.software.ProgramRequirements;
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

    @PostMapping("/addByGames")
    public ResponseEntity<ComputerSetupRequest> addComputerByGames(@RequestBody List<GameRequirements> games, @RequestBody List<ProgramRequirements> programs) {
        UserDto userDto = userService.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        ComputerSetupRequest savedComputerSetup = computerSetupService.createComputerSetupByGames(userDto.getUser_id(), games, programs);
        return new ResponseEntity<>(savedComputerSetup, HttpStatus.CREATED);
    }

    @PostMapping("/{id}/delete")
    public ResponseEntity<ComputerSetupRequest> deleteComputer(@PathVariable int id) {
        UserDto userDto = userService.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        computerSetupService.deleteComputerSetup(userDto.getUser_id(), id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ComputerSetupRequest>> getAllComputers() {
        List<ComputerSetupRequest> computerSetupRequests = computerSetupService.getComputerSetups();
        return new ResponseEntity<>(computerSetupRequests, HttpStatus.OK);
    }

    @PostMapping("/similar")
    public ResponseEntity<List<ComputerSetupRequest>> getSimilarComputers(@RequestBody SimilarSetupDto similarSetupDto) {
        List<ComputerSetupRequest> computerSetupRequests = computerSetupService.getSimilarComputerSetups(similarSetupDto.getCpu_id(),
                similarSetupDto.getGpu_id(),
                similarSetupDto.getRam_id(),
                similarSetupDto.getMotherboard_id(),
                similarSetupDto.getPower_id(),
                similarSetupDto.getCase_id(),
                similarSetupDto.getSt_id());
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
    @PostMapping("/{id}/rate")
    public ResponseEntity<RatingRequest> rateComputer(@PathVariable int id, @RequestBody RatingRequest rating) {
        UserDto userDto = userService.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        computerSetupService.rateComputerSetup(userDto.getUser_id(), id, rating.getRate());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}/rating")
    public ResponseEntity<double[]> getRatingComputer(@PathVariable int id) {
        double[] computerSetupRating = computerSetupService.getRatingsOfComputerSetup(id);
        return new ResponseEntity<>(computerSetupRating, HttpStatus.OK);
    }
    @GetMapping("/{id}/myRate")
    public ResponseEntity<Double> getComputerRate(@PathVariable int id) {
        UserDto userDto = userService.getByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        double rate = computerSetupService.getRatingOfComputerSetup(userDto.getUser_id(), id);
        return new ResponseEntity<>(rate, HttpStatus.OK);
    }
}
