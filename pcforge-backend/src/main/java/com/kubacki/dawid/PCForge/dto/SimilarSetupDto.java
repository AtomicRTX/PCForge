package com.kubacki.dawid.PCForge.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter

public class SimilarSetupDto {
    private Integer cpu_id;
    private Integer gpu_id;
    private Integer motherboard_id;
    private Integer power_id;
    private Integer ram_id;
    private Integer st_id;
    private Integer case_id;
}
