package com.kubacki.dawid.PCForge.mapper.components;

import com.kubacki.dawid.PCForge.dto.components.PowerDto;
import com.kubacki.dawid.PCForge.models.components.Power;

public class PowerMapper {
    public static PowerDto mapToPowerDto(Power power){
        return new PowerDto(
                power.getPower_id(),
                power.getName(),
                power.getWatt(),
                power.getSize()
        );
    }
}
