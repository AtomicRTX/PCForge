package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "Power")

public class Power {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int power_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private Integer watt;

    @Column(nullable=false)
    private String size;
}
