package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "Motherboards")

public class Motherboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mb_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable = false)
    private String socket;

    @Column(nullable=false)
    private String form_factor;

    @Column(nullable=false)
    private String memory_type;

    @Column(nullable=false)
    private Integer memory_capacity;

    @Column(nullable=false)
    private Integer memory_slots;
}
