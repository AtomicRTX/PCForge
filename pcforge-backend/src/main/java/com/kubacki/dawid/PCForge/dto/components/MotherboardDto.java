package com.kubacki.dawid.PCForge.dto.components;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MotherboardDto {
    private Integer mb_id;
    private String name;
    private String producer;
    private String socket;
    private String form_factor;
    private String memory_type;
    private Integer memory_capacity;
    private Integer memory_slots;
}
