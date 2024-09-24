package com.kubacki.dawid.PCForge.models.setups;

import com.kubacki.dawid.PCForge.models.components.*;
import jakarta.persistence.*;

@Entity
@Table(name = "ComputerSetup")

public class ComputerSetup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cs_id;

    @ManyToOne
    @JoinColumn(name = "cpu_id", nullable = false)
    private CPU cpu;

    @ManyToOne
    @JoinColumn(name = "gpu_id", nullable = false)
    private GPU gpu;

    @ManyToOne
    @JoinColumn(name = "case_id", nullable = false)
    private ComputerCase cas;

    @ManyToOne
    @JoinColumn(name = "ram_id", nullable = false)
    private RAM mem;

    @ManyToOne
    @JoinColumn(name = "mb_id", nullable = false)
    private Motherboard motherboard;

    @ManyToOne
    @JoinColumn(name = "power_id", nullable = false)
    private Power power;

    @ManyToOne
    @JoinColumn(name = "st_id", nullable = false)
    private Storage storage;
}
