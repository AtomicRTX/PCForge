package com.kubacki.dawid.PCForge.dto.components;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class PowerDto {
    private Integer power_id;
    private String name;
    private Integer watt;
    private String size;
}
