package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "Storage")

public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int st_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private int size;

    @Column()
    private Integer rank;
}
