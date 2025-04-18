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
    private Integer gpu_id;
    private String name;
    private String producer;
    private Integer gpuSize;
    private Integer vram;
    private Integer tdp;
}
