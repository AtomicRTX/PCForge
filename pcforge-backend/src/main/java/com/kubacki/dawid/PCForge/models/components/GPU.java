package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;

@Entity
@Table(name = "GPUs")

public class GPU {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gpu_id;

    @Column(unique=true, nullable=false)
    private String gpu_name;

    @Column(nullable=false)
    private String length;

    @Column(nullable=false)
    private int vram;

    @Column()
    private Double price;
}
