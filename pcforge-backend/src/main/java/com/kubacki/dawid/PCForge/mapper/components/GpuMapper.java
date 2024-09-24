package com.kubacki.dawid.PCForge.mapper.components;

import com.kubacki.dawid.PCForge.dto.components.GpuDto;
import com.kubacki.dawid.PCForge.models.components.GPU;

public class GpuMapper {
    public static GpuDto mapToGpuDto(GPU gpu){
        return new GpuDto(
                gpu.getGpu_id(),
                gpu.getName(),
                gpu.getProducer(),
                gpu.getGpuSize(),
                gpu.getVram(),
                gpu.getTdp()
        );
    }
}
