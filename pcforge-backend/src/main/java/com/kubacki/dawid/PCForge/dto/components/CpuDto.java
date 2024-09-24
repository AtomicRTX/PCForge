package com.kubacki.dawid.PCForge.dto.components;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CpuDto {
    private int cpu_id;
    private String name;
    private String producer;
    private int cores;
    private int threads;
    private Double base_clock;
    private String socket;
    private String integral_gpu;
    private Integer tdp;
}
