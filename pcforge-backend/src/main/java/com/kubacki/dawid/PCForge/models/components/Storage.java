package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;

@Entity
@Table(name = "Storage")

public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int st_id;

    @Column(unique=true, nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private int size;

    @Column()
    private Double price;
}
