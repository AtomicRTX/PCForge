package com.kubacki.dawid.PCForge.service;

import com.kubacki.dawid.PCForge.dto.AuthenticationRequest;
import com.kubacki.dawid.PCForge.dto.AuthenticationResponse;
import com.kubacki.dawid.PCForge.dto.RegisterRequest;
import com.kubacki.dawid.PCForge.models.users.Type;
import com.kubacki.dawid.PCForge.models.users.User;
import com.kubacki.dawid.PCForge.repositories.TypeRepository;
import com.kubacki.dawid.PCForge.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor

public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TypeRepository typeRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .types(new HashSet<>())
                .build();
        Type type = typeRepository.findByName(TypeEnum.USER.name()).orElse(Type.builder().name(TypeEnum.USER.name()).build());
        user.addType(type);
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
