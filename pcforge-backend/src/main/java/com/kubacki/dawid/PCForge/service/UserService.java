package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.dto.UserDto;

public interface UserService {
    UserDto getByEmail(String email);
    UserDto getById(int id);
}
