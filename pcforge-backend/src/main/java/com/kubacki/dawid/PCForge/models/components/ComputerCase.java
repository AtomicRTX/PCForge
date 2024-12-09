package com.kubacki.dawid.PCForge.models.components;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "cases")

public class ComputerCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer case_id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String producer;

    @Column(nullable=false)
    private String motherboard;

    @Column(nullable=false)
    private Integer gpu_size;

    @Column(nullable=false)
    private String power_supply;

}
