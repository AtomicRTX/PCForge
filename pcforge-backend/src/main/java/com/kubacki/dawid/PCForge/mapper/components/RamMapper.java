package com.kubacki.dawid.PCForge.mapper.components;

import com.kubacki.dawid.PCForge.dto.components.RamDto;
import com.kubacki.dawid.PCForge.models.components.RAM;

public class RamMapper {
    public static RamDto mapToRamDto(RAM ram){
        return new RamDto(
                ram.getRam_id(),
                ram.getName(),
                ram.getRam_type(),
                ram.getClock(),
                ram.getSize(),
                ram.getSticks()
        );
    }
}
