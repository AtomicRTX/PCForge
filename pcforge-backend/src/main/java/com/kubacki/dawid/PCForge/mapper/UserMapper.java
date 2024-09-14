package com.kubacki.dawid.PCForge.mapper;

import com.kubacki.dawid.PCForge.dto.UserDto;
import com.kubacki.dawid.PCForge.models.users.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getUser_id(),
                user.getName(),
                user.getPassword(),
                user.getEmail(),
                user.getPhone(),
                user.getPhoto()
        );
    }
}
