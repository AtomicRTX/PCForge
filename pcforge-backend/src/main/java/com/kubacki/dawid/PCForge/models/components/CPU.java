package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;

@Entity
@Table(name = "CPUs")

public class CPU {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cpu_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private int cores;

    @Column(nullable=false)
    private int threads;

    @Column()
    private Double base_clock;

    @Column(nullable = false)
    private String socket;

    @Column(nullable = false)
    private String integral_gpu;

    @Column(nullable = false)
    private Double tdp;
}
