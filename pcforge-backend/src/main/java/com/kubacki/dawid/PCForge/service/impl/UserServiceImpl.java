package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.dto.UserDto;
import com.kubacki.dawid.PCForge.mapper.UserMapper;
import com.kubacki.dawid.PCForge.models.users.User;
import com.kubacki.dawid.PCForge.repositories.ComputerSetupRepository;
import com.kubacki.dawid.PCForge.repositories.UserRepository;
import com.kubacki.dawid.PCForge.service.TypeEnum;
import com.kubacki.dawid.PCForge.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
    public void updateUser(UserDto userDto) {
        User user = userRepository.findById(userDto.getUser_id()).orElseThrow(() -> new RuntimeException("User not found."));

        user.setUsername(userDto.getUsername());
        user.setPhoto(userDto.getPhoto());
        user.setPhone(userDto.getPhone());

        userRepository.save(user);
    }

    @Override
    public Boolean isAdmin(UserDto userDto) {
        User user = userRepository.findById(userDto.getUser_id()).orElseThrow(() -> new RuntimeException("User not found."));
        return user.getTypes().stream().anyMatch(type -> type.getName().equals(TypeEnum.ADMIN.name()));
    }

    @Override
    public Boolean isExpert(UserDto userDto) {
        User user = userRepository.findById(userDto.getUser_id()).orElseThrow(() -> new RuntimeException("User not found."));
        return user.getTypes().stream().anyMatch(type -> type.getName().equals(TypeEnum.EXPERT.name()));
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user -> UserMapper.mapToUserDto(user))).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(int user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found."));
        computerSetupRepository.deleteComputerSetupByUser(user);
        userRepository.delete(user);
    }
}
