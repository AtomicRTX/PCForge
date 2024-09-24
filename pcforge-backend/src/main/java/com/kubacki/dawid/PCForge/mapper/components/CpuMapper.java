package com.kubacki.dawid.PCForge.mapper.components;

import com.kubacki.dawid.PCForge.dto.components.CpuDto;
import com.kubacki.dawid.PCForge.models.components.CPU;

public class CpuMapper {
    public static CpuDto mapToCpuDto(CPU cpu) {
        return new CpuDto(
                cpu.getCpu_id(),
                cpu.getName(),
                cpu.getProducer(),
                cpu.getCores(),
                cpu.getThreads(),
                cpu.getBase_clock(),
                cpu.getSocket(),
                cpu.getIntegral_gpu(),
                cpu.getTdp()
        );
    }
}
