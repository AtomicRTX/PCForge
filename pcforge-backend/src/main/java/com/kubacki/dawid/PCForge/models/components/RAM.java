package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;

@Entity
@Table(name = "RAM")

public class RAM {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ram_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private String ram_type;

    @Column(nullable=false)
    private String clock;

    @Column(nullable=false)
    private int size;

    @Column()
    private Double price;
}
