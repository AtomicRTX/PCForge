package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "Storage")

public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer st_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private Integer size;

    @Column()
    private Integer rank;
}
