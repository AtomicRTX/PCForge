package com.kubacki.dawid.PCForge.models.requirements;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "GameRequirements")

public class GameRequirements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int game_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private float MinCPUSpeed;

    @Column(nullable=false)
    private float RecomCPUSpeed;

    @Column(nullable=false)
    private float MinCPUCore;

    @Column(nullable=false)
    private float RecomCPUCore;

    @Column(nullable=false)
    private float MinCPUThread;

    @Column(nullable=false)
    private float RecomCPUThread;

    @Column(nullable=false)
    private float MinGPUvram;

    @Column(nullable=false)
    private float RecomGPUvram;

    @Column(nullable=false)
    private float MinRam;

    @Column(nullable=false)
    private float RecomRam;

    @Column(nullable=false)
    private float HDDSpace;
}
