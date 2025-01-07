package com.kubacki.dawid.PCForge.controller;

import com.kubacki.dawid.PCForge.dto.UserDto;
import com.kubacki.dawid.PCForge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor

public class UserController {
    @Autowired
    private UserService userService;

    private UserDto currentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = userService.getByEmail(auth.getName());
        return userDto;
    }

    @GetMapping("/current")
    public ResponseEntity<UserDto> getCurrentUser() {
        UserDto userDto = currentUser();
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/edit")
    public ResponseEntity<UserDto> editUser(@RequestParam("username") String username, @RequestParam("phone") String phone, @RequestParam("photo") MultipartFile photo) {
        UserDto userDto1 = currentUser();
        userDto1.setUsername(username);
        userDto1.setPhone(phone);

        userService.updateUser(userDto1, photo);
        return ResponseEntity.ok(userDto1);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Integer id) {
        UserDto userDto = userService.getById(id);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/admin")
    public ResponseEntity<Boolean> getAdminUser() {
        UserDto userDto = currentUser();
        Boolean admin = userService.isAdmin(userDto);
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        UserDto userDto = currentUser();
        List<UserDto> userDtos = userService.getAllUsers();
        userDtos.removeIf(user -> user.getUser_id() == userDto.getUser_id());
        return ResponseEntity.ok(userDtos);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<UserDto> deleteUser(@RequestBody UserDto userDto) {
        userService.deleteUser(userDto.getUser_id());
        return ResponseEntity.ok(userDto);
    }
}
