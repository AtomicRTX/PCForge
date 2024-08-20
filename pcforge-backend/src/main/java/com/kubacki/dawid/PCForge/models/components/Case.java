package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "cases")

public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int case_id;

    @Column(unique=true)
    private String name;

    @Column(unique=true, nullable=false)
    private String producer;

    @Column(nullable=false)
    private String case_type;

    @Column(nullable=false)
    private String gpu_size;

    @Column()
    private Double price;
}
