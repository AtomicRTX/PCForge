package com.kubacki.dawid.PCForge.models.users;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Entity
@Table(name="users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(unique=true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column()
    private String photo;

    @ManyToMany
    @JoinTable(
            name = "user_types",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id")
    )

    private Set<Type> types = new HashSet<>();
}