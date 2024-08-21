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

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private String case_type;

    @Column(nullable=false)
    private Double gpu_size;

    @Column()
    private Double price;
}
