package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserDto getByEmail(String email);
    UserDto getById(int id);
    void updateUser(UserDto userDto, MultipartFile photo);
    Boolean isAdmin(UserDto userDto);
    List<UserDto> getAllUsers();
    void deleteUser(int user_id);
}
