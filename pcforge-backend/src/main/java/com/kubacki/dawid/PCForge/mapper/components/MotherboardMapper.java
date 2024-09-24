package com.kubacki.dawid.PCForge.mapper.components;

import com.kubacki.dawid.PCForge.dto.components.MotherboardDto;
import com.kubacki.dawid.PCForge.models.components.Motherboard;

public class MotherboardMapper {
    public static MotherboardDto mapToMotherboardDto(Motherboard motherboard) {
        return new MotherboardDto(
                motherboard.getMb_id(),
                motherboard.getName(),
                motherboard.getProducer(),
                motherboard.getSocket(),
                motherboard.getForm_factor(),
                motherboard.getMemory_type(),
                motherboard.getMemory_capacity(),
                motherboard.getMemory_slots()
        );
    }
}
