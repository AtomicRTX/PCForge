package com.kubacki.dawid.PCForge.repositories.users;

import com.kubacki.dawid.PCForge.models.users.Type;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TypeRepository extends JpaRepository<Type, Integer> {
    Optional<Type> findByName(String name);
}
