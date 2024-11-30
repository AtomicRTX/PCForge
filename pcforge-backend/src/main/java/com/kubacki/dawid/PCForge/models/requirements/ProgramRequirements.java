package com.kubacki.dawid.PCForge.models.requirements;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "ProgramRequirements")


public class ProgramRequirements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int program_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private float MinCPUSpeed;

    @Column(nullable=false)
    private float MinCPUCore;

    @Column(nullable=false)
    private float MinCPUThread;

    @Column(nullable=false)
    private float MinGPUvram;

    @Column(nullable=false)
    private float MinRam;

    @Column(nullable=false)
    private float HDDSpace;
}
