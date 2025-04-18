package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "RAM")

public class RAM {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ram_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String ram_type;

    @Column(nullable=false)
    private String clock;

    @Column(nullable=false)
    private Double size;

    @Column(nullable=false)
    private Integer sticks;

    @Column()
    private Integer rank;
}
