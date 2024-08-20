package com.kubacki.dawid.PCForge.models.users;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "types")

public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int type_id;

    @Column(unique = true, nullable = false)
    private String name;
}
