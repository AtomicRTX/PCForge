package com.kubacki.dawid.PCForge.dto.components;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ComputerCaseDto {
    private Integer case_id;
    private String name;
    private String producer;
    private String motherboard;
    private Integer gpu_size;
    private String power_supply;
}
