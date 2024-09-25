package com.kubacki.dawid.PCForge.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ComputerSetupRequest {
    private Integer cs_id;
    private Integer user_id;
    private Integer case_id;
    private Integer cpu_id;
    private Integer gpu_id;
    private Integer ram_id;
    private Integer mb_id;
    private Integer power_id;
    private Integer st_id;
}
