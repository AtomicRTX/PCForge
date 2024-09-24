package com.kubacki.dawid.PCForge.dto.components;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RamDto {
    private int ram_id;
    private String name;
    private String ram_type;
    private String clock;
    private Double size;
    private int sticks;
}
