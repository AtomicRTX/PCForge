package com.kubacki.dawid.PCForge.repositories;

import com.kubacki.dawid.PCForge.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
