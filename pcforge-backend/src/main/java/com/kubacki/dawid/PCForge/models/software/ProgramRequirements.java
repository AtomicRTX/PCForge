package com.kubacki.dawid.PCForge.models.software;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "ProgramRequirements")


public class ProgramRequirements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer program_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private Double min_cpu_speed;

    @Column(nullable=false)
    private Double min_cpu_cores;

    @Column(nullable=false)
    private Double min_cpu_threads;

    @Column(nullable=false)
    private Double min_gpu_vram;

    @Column(nullable=false)
    private Double min_ram;

    @Column(nullable=false)
    private Double hdd_space;
}
