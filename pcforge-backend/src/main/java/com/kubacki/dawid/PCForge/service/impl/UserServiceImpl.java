package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.dto.UserDto;
import com.kubacki.dawid.PCForge.mapper.UserMapper;
import com.kubacki.dawid.PCForge.models.users.User;
import com.kubacki.dawid.PCForge.repositories.setups.ComputerSetupRepository;
import com.kubacki.dawid.PCForge.repositories.users.UserRepository;
import com.kubacki.dawid.PCForge.service.TypeEnum;
import com.kubacki.dawid.PCForge.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class UserServiceImpl implements UserService {
    private final ComputerSetupRepository computerSetupRepository;
    private UserRepository userRepository;


    @Override
    public UserDto getByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found."));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto getById(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found."));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public void updateUser(UserDto userDto, MultipartFile photo) {
        User user = userRepository.findById(userDto.getUser_id()).orElseThrow(() -> new RuntimeException("User not found."));

        user.setUsername(userDto.getUsername());
        user.setPhone(userDto.getPhone());

        if (photo != null && !photo.isEmpty()) {
            String photoPath = savePhoto(photo);
            user.setPhoto(photoPath);
        }

        userRepository.save(user);
    }

    @Override
    public Boolean isAdmin(UserDto userDto) {
        User user = userRepository.findById(userDto.getUser_id()).orElseThrow(() -> new RuntimeException("User not found."));
        return user.getTypes().stream().anyMatch(type -> type.getName().equals(TypeEnum.ADMIN.name()));
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user -> UserMapper.mapToUserDto(user))).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteUser(int user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        userRepository.delete(user);
    }

    private String savePhoto(MultipartFile photo) {
        try {
            String uploadDir = new File("pcforge-frontend/public/uploads").getAbsolutePath();
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            photo.transferTo(filePath.toFile());

            return "uploads/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Could not save photo", e);
        }
    }
}