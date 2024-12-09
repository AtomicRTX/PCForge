package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "CPUs")

public class CPU {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cpu_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private Integer cores;

    @Column(nullable=false)
    private Integer threads;

    @Column()
    private Double base_clock;

    @Column(nullable = false)
    private String socket;

    @Column(nullable = false)
    private String integral_gpu;

    @Column(nullable = false)
    private Integer tdp;

    @Column()
    private Integer rank;
}
