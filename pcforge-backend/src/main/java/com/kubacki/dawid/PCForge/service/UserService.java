package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto getByEmail(String email);
    UserDto getById(int id);
    void updateUser(UserDto userDto);
    Boolean isAdmin(UserDto userDto);
    Boolean isExpert(UserDto userDto);
    List<UserDto> getAllUsers();
    void deleteUser(int user_id);
}
