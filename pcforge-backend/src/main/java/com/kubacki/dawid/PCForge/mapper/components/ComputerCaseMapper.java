package com.kubacki.dawid.PCForge.mapper.components;

import com.kubacki.dawid.PCForge.dto.components.ComputerCaseDto;
import com.kubacki.dawid.PCForge.models.components.ComputerCase;

public class ComputerCaseMapper {
    public static ComputerCaseDto mapToCaseDto(ComputerCase c){
        return new ComputerCaseDto(
                c.getCase_id(),
                c.getName(),
                c.getProducer(),
                c.getMotherboard(),
                c.getGpu_size(),
                c.getPower_supply()
        );
    }
}
