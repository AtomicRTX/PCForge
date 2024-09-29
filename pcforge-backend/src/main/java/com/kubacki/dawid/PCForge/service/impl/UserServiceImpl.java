package com.kubacki.dawid.PCForge.service.impl;

import com.kubacki.dawid.PCForge.dto.UserDto;
import com.kubacki.dawid.PCForge.mapper.UserMapper;
import com.kubacki.dawid.PCForge.models.users.User;
import com.kubacki.dawid.PCForge.repositories.UserRepository;
import com.kubacki.dawid.PCForge.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor

public class UserServiceImpl implements UserService {
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
}
