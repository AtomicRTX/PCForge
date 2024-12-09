package com.kubacki.dawid.PCForge.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
    private Integer user_id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String photo;
}
