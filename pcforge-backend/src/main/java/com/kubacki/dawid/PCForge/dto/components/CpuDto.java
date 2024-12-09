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
    private Integer cpu_id;
    private String name;
    private String producer;
    private Integer cores;
    private Integer threads;
    private Double base_clock;
    private String socket;
    private String integral_gpu;
    private Integer tdp;
}
