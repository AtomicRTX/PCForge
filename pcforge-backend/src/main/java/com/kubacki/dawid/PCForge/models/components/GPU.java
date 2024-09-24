package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "GPUs")

public class GPU {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gpu_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private String gpuSize;

    @Column(nullable=false)
    private int vram;

    @Column(nullable = false)
    private Integer tdp;
}
