package com.kubacki.dawid.PCForge.dto.components;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class GpuDto {
    private int gpu_id;
    private String name;
    private String producer;
    private String gpuSize;
    private int vram;
    private Integer tdp;
}
