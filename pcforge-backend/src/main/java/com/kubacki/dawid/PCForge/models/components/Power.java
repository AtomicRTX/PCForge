package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;

@Entity
@Table(name = "Power")

public class Power {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int power_id;

    @Column(unique=true, nullable=false)
    private String name;

    @Column(nullable=false)
    private String watt;

    @Column()
    private Double price;
}
